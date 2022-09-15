import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL
  } from '../actions/actons';

  const initialState = {
    order: {number: 0},
    orderModal: false,
    orderRequest: false,
    orderFailed: false,
    isOrderDetailsOpen: false
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
    case (OPEN_ORDER_MODAL): {
      return { ...state, isOrderDetailsOpen: true };
    }
    case (CLOSE_ORDER_MODAL): {
      return { ...state, isOrderDetailsOpen: false };
    }
    default: {
      return state;
    }
  }
};

