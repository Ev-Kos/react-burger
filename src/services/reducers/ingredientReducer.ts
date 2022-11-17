import {
    ADD_INGREDIENT_DATA,
    DELETE_INGREDIENT_DATA,
    TIngredientActions
  } from '../actions/ingredientActions';
import {TIngredient} from '../types/data';

type TInitialState = {
  detailsIngredient: any;
}

const initialState: TInitialState = {
  detailsIngredient: {}
}
    
export const ingredientReducer = (state = initialState, action: TIngredientActions) => {
  switch (action.type) {
    case ADD_INGREDIENT_DATA: {
      return {
        ...state,
        detailsIngredient: action.item,
      };
    }
    case DELETE_INGREDIENT_DATA: {
      return {
        ...state,
        detailsIngredient: {},
      };
    }
    default: {
      return state;
    }
  }
};
  