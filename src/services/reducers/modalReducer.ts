import {
    OPEN_ORDER_MODAL,
    CLOSE_ORDER_MODAL,
    OPEN_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL,
    TModalActions
  } from '../actions/modalActions';

type TinitialState = {
    isIngredientDetailsOpen: boolean;
    isOrderDetailsOpen: boolean;
};

const initialState: TinitialState = {
    isIngredientDetailsOpen: false,
    isOrderDetailsOpen: false
};
    
export const modalReducer = (
  state = initialState, 
  action: TModalActions
  ): TinitialState => {
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
  