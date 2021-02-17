import constants from "../constants.json"

const NavigationReducer = (action) => {
  const navigation = constants.navigation;
  switch(action.type) {
    case navigation.load:
      return {
        redirect: null
      };
    
    case navigation.redirect:
      return {
        redirect: action.params
      };
  }
};
export default NavigationReducer;

export const defaultNavigationState = {
  redirect: null
};