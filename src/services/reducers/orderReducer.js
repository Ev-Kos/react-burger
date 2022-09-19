import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
  } from '../actions/orderActions';

  const initialState = {
    order: {number: 0},
    orderRequest: false,
    orderFailed: false
  };

export const orderReducer = (state = initialState, action) => {
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
      };
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
      return state;
    }
  }
};

