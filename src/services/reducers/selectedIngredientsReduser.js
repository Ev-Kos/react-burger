import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    MOVE_ELEMENT
  } from '../actions/selectedIngredientsActions';

const initialState = {
    selectedIngredient: []
};

export const selectedIngredientsReducer = (state = initialState, action) => {
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
            selectedIngredient: action.payload,
          });
        }
        default: {
          return state;
        }
      }
}