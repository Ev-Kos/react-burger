export const socketMiddleware = (wsUrl, wsActions) => {

    return store => {
        let socket = null;

        return next => action => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;


            if (type === wsInit) {
                socket = new WebSocket(`${wsUrl}${payload}`);
            }
            if (socket && type === onClose) {
                socket.close(1000);
            }

            if (socket) {
                socket.onopen = event => {
                    //console.log('открылся');
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
                    //console.log("закрылся");
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