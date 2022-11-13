import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  TOrderActions
  } from '../actions/orderActions';
import { AppThunk } from '../types';

type TinitialState = {
  order: null | number;
  orderRequest: boolean;
  orderFailed: boolean;
  orderSuccess: boolean;
}

const initialState: TinitialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
  orderSuccess: false
};

export const orderReducer = (
  state = initialState, 
  action: TOrderActions
  ): TinitialState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderRequest: false,
        orderFailed: false,
        orderSuccess: true
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        order: null,
        orderRequest: false,
        orderFailed: true,
        orderSuccess: false
      };
    }
    default: {
      return state;
    }
  }
};

