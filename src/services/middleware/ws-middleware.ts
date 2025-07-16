import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
	Middleware,
} from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TWsActions<R, S> = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	onConnecting?: ActionCreatorWithoutPayload;
	onOpen?: ActionCreatorWithoutPayload;
	onClose?: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	sendMessage?: ActionCreatorWithPayload<S>;
	onMessage: ActionCreatorWithPayload<R>;
};

const RECONNECT_PERIOD = 3000;

export const wsMiddleware = <R, S>(
	wsActons: TWsActions<R, S>
): Middleware<object, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		let isConnected = false;
		let reconnectId: ReturnType<typeof setTimeout> | null = null;
		let url = '';

		const {
			connect,
			sendMessage,
			onOpen,
			onClose,
			onError,
			onMessage,
			onConnecting,
			disconnect,
		} = wsActons;

		const { dispatch } = store;

		return (next) => (action) => {
			if (connect.match(action)) {
				socket = new WebSocket(action.payload);
				url = action.payload;
				isConnected = true;

				onConnecting && dispatch(onConnecting());

				socket.onopen = () => {
					onOpen && dispatch(onOpen());
				};

				socket.onerror = () => {
					dispatch(onError('Unknown webSocket error'));
				};

				socket.onclose = () => {
					onClose && dispatch(onClose());

					if (isConnected) {
						reconnectId = setTimeout(() => {
							dispatch(connect(url));
						}, RECONNECT_PERIOD);
					}
				};

				socket.onmessage = (e) => {
					const { data } = e;
					try {
						const parsedData = JSON.parse(data);
						dispatch(onMessage(parsedData));
					} catch (error) {
						dispatch(onError((error as Error).message));
					}
				};
				return;
			}

			if (sendMessage?.match(action) && socket) {
				try {
					socket.send(JSON.stringify(action.payload));
				} catch (error) {
					dispatch(onError((error as Error).message));
				}

				return;
			}

			if (disconnect.match(action)) {
				if (reconnectId) {
					clearTimeout(reconnectId);
					reconnectId = null;
				}
				isConnected = false;
				socket?.close();
				socket = null;

				return;
			}

			next(action);
		};
	};
};
