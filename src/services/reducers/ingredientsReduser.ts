import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    TIngredientsActions
  } from '../actions/ingredientsActions';
import { TIngredient } from '../types/data';

type TInitialState = {
    ingredients: ReadonlyArray<TIngredient>;
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
}; 

const initialState: TInitialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false
};    

export const ingredientsReducer = (
  state = initialState, 
  action: TIngredientsActions
  ): TInitialState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredients: [],
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
  