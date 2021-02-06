// Libraries
import _ from "lodash";

// Sounds
import soundAlert from "../sounds/Funk.mp3";
import soundSuccess from "../sounds/Ding.mp3";

class KitUtils {

  // Async Queue
  static asyncQueue = [];
  static isAsyncQueueActive = false;

  // Cancelable Items
  static cancelableItems = {};

/*====================
  Async Queueing
  ====================*/
  static Async(asyncFunction) {
    if(!KitUtils.asyncQueue) {
      KitUtils.asyncQueue = [];
    }
    const cancelableRef = KitUtils.createCancelable();
    KitUtils.asyncQueue.push([cancelableRef, asyncFunction]);
    KitUtils.AsyncStart();
    return cancelableRef;
  }

  static AsyncStart() {
    if(!KitUtils.isAsyncQueueActive) {
      KitUtils.isAsyncQueueActive = true;
      KitUtils.AsyncNext();
    }
  }

  static AsyncNext() {
    if(!KitUtils.asyncQueue || !KitUtils.asyncQueue.length) {
      KitUtils.isAsyncQueueActive = false;
    } else {
      const nextAsync = KitUtils.asyncQueue.shift();
      const isCanceled = KitUtils.getCancelable(nextAsync[0], false);
      if(!isCanceled) {
        (async () => {
          try {
            await nextAsync[1]();
          } catch(error) {console.log("Async Function Failed! " + error);}
        })().then(() => {
          KitUtils.AsyncNext();
        });
      } else {
        KitUtils.AsyncNext();
      }
    }
  }

  /*====================
  Cancelable Callbacks
  ====================*/
  static cancel(key) {
    if(KitUtils.cancelableItems.hasOwnProperty(key)) {
      KitUtils.cancelableItems[key].isCanceled = true;
    }
  }

  static createCancelable() {
    const newKey = _.uniqueId("cancelable-");
    const newCancelable = {[newKey] : {isCanceled: false}};
    if(!KitUtils.cancelableItems) {
      KitUtils.cancelableItems = {};
    }
    _.merge(KitUtils.cancelableItems, newCancelable);
    return newKey;
  }

  static getCancelable(key, shouldRemove) {
    if(KitUtils.cancelableItems.hasOwnProperty(key)) {
      const value = KitUtils.cancelableItems[key].isCanceled;
      if(shouldRemove) {
        _.omit(KitUtils.cancelableItems, key);
      }
      return value;
    }
    return true;
  }

  /*====================
  Sound Effects
  ====================*/
  static playSound(sound) {
    var newSound = new Audio(sound);
    newSound.play();
  }

  static soundAlert() {
    KitUtils.playSound(soundAlert);
  }

  static soundSuccess() {
    KitUtils.playSound(soundSuccess);
  }

  /*====================
  Testing & Debugging
  ====================*/
  static simulateNetworkDelay(delay, onComplete) {
    setTimeout(() => {
      onComplete();
    }, delay);
  }
}
export default KitUtils;