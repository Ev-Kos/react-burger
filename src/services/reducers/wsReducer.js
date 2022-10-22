import {
    WS_USER_NAME_UPDATE,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
  } from '../action-types';
  
  const initialState = {
    wsConnected: false,
    messages: [],
    wsError: undefined
  };
  
  export const wsReducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
            ...state,
            wsConnected: true,
            wsError: undefined
            };
  
        case WS_CONNECTION_ERROR:
            return {
            ...state,
            wsConnected: false,
            wsError: action.payload
            };
  
        case WS_CONNECTION_CLOSED:
            return {
            ...state,
            wsConnected: false,
            wsError: undefined
            };
  
        case WS_GET_MESSAGE:
            return {
            ...state,
            messages: state.messages.length
            ? [...state.messages, { ...action.payload, timestamp: new Date().getTime() / 1000 }]
            : [{ ...action.payload, timestamp: new Date().getTime() / 1000 }]
        };
        default:
            return state;
    }
};