import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from './reducers/index';
import thunk from "redux-thunk";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from './actions/wsActions';
import { socketMiddleware } from './middleware/socketMiddleware';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

export type TwsActions = {
    wsInit: typeof WS_CONNECTION_START | typeof WS_CONNECTION_START;
    wsSendMessage: typeof WS_SEND_MESSAGE | typeof WS_SEND_MESSAGE;
    onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_CONNECTION_SUCCESS;
    onClose: typeof WS_CONNECTION_CLOSED | typeof WS_CONNECTION_CLOSED;
    onError: typeof WS_CONNECTION_ERROR | typeof WS_CONNECTION_ERROR;
    onMessage: typeof WS_GET_MESSAGE | typeof WS_GET_MESSAGE;
}

export const wsActions: TwsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
}

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;


export const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));

export const store = createStore(rootReducer, enhancer);