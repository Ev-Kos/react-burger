import { combineReducers } from 'redux';
import {ingredientsReducer} from './ingredientsReduser';
import {orderReducer} from './orderReducer';

const rootReducer = combineReducers({
    ingredientsReducer,
    orderReducer
  })
  
  export default rootReducer;