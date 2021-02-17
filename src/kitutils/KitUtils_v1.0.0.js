// Sounds
import _ from "lodash";
import soundAlert from "../sounds/Funk.mp3";
import soundSuccess from "../sounds/Ding.mp3";

class KitUtils {

  /*====================
  Animation
  ====================*/
  static lerp(currentValue, endValue, stepValue, stepTime, isSubtractive, onChange) {
    currentValue = isSubtractive
    ? parseFloat(currentValue) - parseFloat(stepValue)
    : parseFloat(currentValue) + parseFloat(stepValue);
    
    onChange(currentValue);

    const valueReached = isSubtractive
    ? currentValue <= endValue
    : currentValue >= endValue;

    if(!valueReached) {
      setTimeout(() => {
        KitUtils.lerp(
          currentValue, 
          endValue, 
          stepValue, 
          stepTime, 
          isSubtractive, 
          onChange
        );
      }, stepTime);
    }
  }

  /*====================
  Async Queueing
  ====================*/
  static asyncQueue = null;
  static isAsyncQueueActive = false;

  static Async(asyncFunction) {
    if(!KitUtils.asyncQueue) {
      KitUtils.asyncQueue = [];
    }
    const cancelableRef = KitUtils.createCancelable();
    KitUtils.asyncQueue.push([cancelableRef, asyncFunction]);
    KitUtils.AsyncStart();
  }

  static AsyncStart() {
    if(!KitUtils.isAsyncQueueActive) {
      KitUtils.isAsyncQueueActive = true;
      KitUtils.AsyncNext();
    }
  }

  static AsyncNext() {
    if(!KitUtils.asyncQueue || KitUtils.asyncQueue.length < 1) {
      KitUtils.isAsyncQueueActive = false;
    } else {
      const nextAsync = KitUtils.asyncQueue.shift();
      const isCanceled = KitUtils.getCancelable(nextAsync[0], true);
      if(!isCanceled) {
        (async () => {
          try {
            await nextAsync[1]();
          } catch(error) {console.error("[ERROR] Async function failed: " + error);}
        })().then(() => {
          KitUtils.AsyncNext();
        });
      } else {
        KitUtils.AsyncNext();
      }
    }
  }

  /*====================
  Cancelable References
  ====================*/
  static cancelableRefs = {};
  static cancel(key) {
    if(KitUtils.cancelableRefs.hasOwnProperty(key)) {
      KitUtils.cancelableRefs[key].isCanceled = true;
    }
  }

  static createCancelable() {
    const newKey = _.uniqueId("cancelable-");
    const newCancelable = {[newKey] : {isCanceled: false}};
    if(!KitUtils.cancelableRefs) {
      KitUtils.cancelableRefs = {};
    }
    _.merge(KitUtils.cancelableRefs, newCancelable);
    return newKey;
  }

  static getCancelable(key, shouldRemove) {
    if(KitUtils.cancelableRefs.hasOwnProperty(key)) {
      const value = KitUtils.cancelableRefs[key].isCanceled;
      if(shouldRemove) {
        _.omit(KitUtils.cancelableRefs, key);
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