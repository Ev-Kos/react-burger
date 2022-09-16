import {
    ADD_INGREDIENT_DATA,
    DELETE_INGREDIENT_DATA,
  } from '../actions/ingredientActions';


const initialState = {
    detailsIngredient: {},
};
    
export const ingredientReducer = (state = initialState, action) => {
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
  