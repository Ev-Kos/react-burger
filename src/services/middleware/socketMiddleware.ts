import { NORMAL_CLOSE_CODE } from '../../utils/constants';
import { TwsActions } from '../store';
import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../types/index';

export const socketMiddleware = (
    wsUrl: string, 
    wsActions: TwsActions
    ): Middleware => {

    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => action => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;


            if (type === wsInit) {
                socket = new WebSocket(`${wsUrl}${payload}`);
            }
            if (socket && type === onClose) {
                socket.close(NORMAL_CLOSE_CODE);
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    dispatch({ type: onMessage, payload: JSON.parse(data) });
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

                if (type === wsSendMessage) {
                    const message = payload;
                    socket.send(JSON.stringify(message));
                }
            }
            next(action)
        }
    };
};