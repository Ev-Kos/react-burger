import {
    OPEN_ORDER_MODAL,
    CLOSE_ORDER_MODAL,
    OPEN_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL
  } from '../actions/modalActions';


const initialState = {
    isIngredientDetailsOpen: false,
    isOrderDetailsOpen: false
};
    
export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
      case OPEN_INGREDIENT_MODAL: {
        return { ...state, isIngredientDetailsOpen: true };
      }
      case CLOSE_INGREDIENT_MODAL: {
        return { ...state, isIngredientDetailsOpen: false };
      }
      case OPEN_ORDER_MODAL: {
        return { ...state, isOrderDetailsOpen: true };
      }
      case CLOSE_ORDER_MODAL: {
        return { ...state, isOrderDetailsOpen: false };
      }
      default: {
        return state;
      }
    }
  };
  