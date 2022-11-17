import { TFeedItem } from '../types/data';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: any;
}
export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: TFeedItem;
}

export interface IWsActions {
    wsInit: typeof WS_CONNECTION_START;
    wsSendMessage: typeof WS_SEND_MESSAGE;
    onOpen: typeof wsConnectionSuccess;
    onClose: typeof wsConnectionClosed;
    onError: typeof wsConnectionError;
    onMessage: typeof wsGetMessage;
}
export type TWsActions =
    | IWsConnectionSuccess
    | IWsConnectionError
    | IWsConnectionClosed
    | IWsGetMessage;

export const WsConnectionSucces = (): IWsConnectionSuccess => ({
    type: WS_CONNECTION_SUCCESS,
})

export const WsConnectionError = (error: any): IWsConnectionError => ({
    type: WS_CONNECTION_ERROR,
    payload: error,
})

export const WsConnectionClosed = (): IWsConnectionClosed => ({
    type: WS_CONNECTION_CLOSED,
})

export const WsGetMessage = (message: any): IWsGetMessage => ({
    type: WS_GET_MESSAGE,
    payload: message,
})

export const wsConnectionSuccess = () => {
    return {
        type: WS_CONNECTION_SUCCESS
    }
}

export const wsConnectionError = () => {
    return {
        type: WS_CONNECTION_ERROR
    }
}

export const wsConnectionClosed = () => {
    return {
        type: WS_CONNECTION_CLOSED
    }
}

export const wsGetMessage = (message: TFeedItem) => {
    return {
        type: WS_GET_MESSAGE,
        payload: message
    }
}