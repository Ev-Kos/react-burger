import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    MOVE_ELEMENT,
    ADD_INGREDIENT_DATA,
    DELETE_INGREDIENT_DATA,
    OPEN_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL
} from '../actions/actons';

const initialState = {
    ingredients: [],
    selectedIngredient: [],
    detailsIngredient: {},
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientModal: false,
    isIngredientDetailsOpen: false
};
    

  export const ingredientsReducer = (state = initialState, action) => {
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
      case (OPEN_INGREDIENT_MODAL): {
        return { ...state, isIngredientDetailsOpen: true };
      }
      case (CLOSE_INGREDIENT_MODAL): {
        return { ...state, isIngredientDetailsOpen: false };
      }
      default: {
        return state;
      }
    }
  };
  