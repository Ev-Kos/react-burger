import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReduser';
import { orderReducer } from './orderReducer';
import { selectedIngredientsReducer } from './selectedIngredientsReduser';
import { ingredientReducer } from './ingredientReducer';
import { modalReducer } from './modalReducer';
import { forgotPasswordReducer } from './forgotPasswordReducer';
import { registerReducer } from './registerReducer';
import { userReducer } from './userReducer';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
  ingredientsReducer,
  orderReducer,
  selectedIngredientsReducer,
  ingredientReducer,
  modalReducer,
  forgotPasswordReducer,
  registerReducer,
  userReducer,
  wsReducer
})
  
