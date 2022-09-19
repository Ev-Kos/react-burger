import { combineReducers } from 'redux';
import {ingredientsReducer} from './ingredientsReduser';
import {orderReducer} from './orderReducer';
import {selectedIngredientsReducer} from './selectedIngredientsReduser';
import {ingredientReducer} from './ingredientReducer';
import {modalReducer} from './modalReducer';

const rootReducer = combineReducers({
    ingredientsReducer,
    orderReducer,
    selectedIngredientsReducer,
    ingredientReducer,
    modalReducer
  })
  
  export default rootReducer;