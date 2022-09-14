import {combineReducers} from "redux";
import {GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    OPEN_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL,
    OPEN_ORDER_MODAL,
    CLOSE_ORDER_MODAL,
    GET_ORDER_SUCCESS,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    MOVE_ELEMENT,
    ADD_INGREDIENT_DATA,
    DELETE_INGREDIENT_DATA,
    GET_ORDER_FAILED
  } from '../actions/actions';

const initialState = {
    ingredients: [],
    selectedIngredient: [],
    detailsIngredient: {},
    order: {
      number: 0
    },
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientModal: false,
    orderModal: false,
    orderRequest: false,
    orderFailed: false
};  

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_INGREDIENTS_REQUEST: {
        return {
          ...state,
          ingredientsRequest: true
        }
      }
      case GET_INGREDIENTS_SUCCESS: {
        return {
          ...state,
          ingredientsRequest: false,
          ingredientsFailed: false,
          ingredients: action.ingredients
        }
      }
      case GET_INGREDIENTS_FAILED: {
        return {
          ...state,
          ingredientsRequest: false,
          ingredientsFailed: true
        }
      }
      case OPEN_INGREDIENT_MODAL: {
        return {
          ...state,
          ingredientModal: true
        }
      }
      case CLOSE_INGREDIENT_MODAL: {
        return {
          ...state,
          ingredientModal: false
        }
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
      case OPEN_ORDER_MODAL: {
        return {
          ...state,
          orderModal: true
        }
      }
      case CLOSE_ORDER_MODAL: {
        return {
          ...state,
          orderModal: false
        }
      }
      case GET_ORDER_SUCCESS: {
        return {
          ...state,
          order: action.order,
          orderRequest: false,
          orderFailed: false,
        }
      }
      case GET_ORDER_FAILED: {
        return {
          ...state,
          order: {
            number: 0,
          },
          orderRequest: false,
          orderFailed: true,
        };
      }
      default: {
        return state
      }
    }
  }

export const rootReducer = combineReducers({
    data: ingredientsReducer
})