import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    MOVE_ELEMENT,
    CLEAR_CONSTRUCTOR,
    TSelectedIngredientsActions
  } from '../actions/selectedIngredientsActions';
import { TSelectedIngredient } from '../types/data';

type TInitialState = {
    selectedIngredient: ReadonlyArray<TSelectedIngredient>;
    moveIngredient: object;
};

const initialState: TInitialState = {
    selectedIngredient: [],
    moveIngredient: {}
};

export const selectedIngredientsReducer = (
  state = initialState, 
  action: TSelectedIngredientsActions
  ): TInitialState => {
    switch (action.type) {
        case ADD_INGREDIENT: {
          return {
            ...state,
            selectedIngredient: [...state.selectedIngredient, action.item]
          };
        }
        case DELETE_INGREDIENT: {
          return {
            ...state,
            selectedIngredient: [...state.selectedIngredient].filter((item, index) => index !== action.index),
          };
        }
        case MOVE_ELEMENT: {
          return ({
            ...state,
            moveIngredient: action.item,
          });
        }
        case CLEAR_CONSTRUCTOR: {
          return ({
            ...state,
            selectedIngredient: []
          })
        }
        default: {
          return state;
        }
      }
}