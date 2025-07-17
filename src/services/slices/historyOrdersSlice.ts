import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFeed, WsStatus } from '@/utils/types';

export type TInitialState = {
	status: WsStatus;
	data: TFeed | null;
	error: string | null;
};

const initialState: TInitialState = {
	status: WsStatus.OFFLINE,
	data: null,
	error: null,
};

export const historyOrdersWsSlice = createSlice({
	name: 'historyOrdersWs',
	initialState,
	reducers: {
		historyOrdersConnect: (_state, action: PayloadAction<string>) => {
			console.log(action.payload);
		},
		historyOrdersDisconnect: () => {},
		historyOrdersOnConnecting: (state) => {
			state.status = WsStatus.CONNECTING;
		},
		historyOrdersOnClose: (state) => {
			state.status = WsStatus.OFFLINE;
		},
		historyOrdersOnOpen: (state) => {
			state.status = WsStatus.ONLINE;
		},
		historyOrdersOnError: (state, action) => {
			state.error = action.payload;
		},
		historyOrdersOnMessage: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const {
	historyOrdersOnConnecting,
	historyOrdersOnOpen,
	historyOrdersOnClose,
	historyOrdersOnError,
	historyOrdersOnMessage,
	historyOrdersConnect,
	historyOrdersDisconnect,
} = historyOrdersWsSlice.actions;

export default historyOrdersWsSlice.reducer;
