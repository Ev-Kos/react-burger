import { combineReducers } from 'redux';
import {ingredientsReducer} from './ingredientsReduser';
import {orderReducer} from './orderReducer';
import {selectedIngredientsReducer} from './selectedIngredientsReduser';
import {ingredientReducer} from './ingredientReducer';
import {modalReducer} from './modalReducer';
import {forgotPasswordReducer} from './forgotPasswordReducer';
import {resetPasswordReducer} from './resetPasswordReducer';

const rootReducer = combineReducers({
    ingredientsReducer,
    orderReducer,
    selectedIngredientsReducer,
    ingredientReducer,
    modalReducer,
    forgotPasswordReducer,
    resetPasswordReducer
  })
  
  export default rootReducer;