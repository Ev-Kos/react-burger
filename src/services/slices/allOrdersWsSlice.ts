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

export const alOrdersWsSlice = createSlice({
	name: 'alOrdersWs',
	initialState,
	reducers: {
		allOrdersConnect: (_state, action: PayloadAction<string>) => {
			console.log(action.payload);
		},
		allOrdersDisconnect: () => {},
		allOrdersOnConnecting: (state) => {
			state.status = WsStatus.CONNECTING;
		},
		allOrdersOnClose: (state) => {
			state.status = WsStatus.OFFLINE;
		},
		allOrdersOnOpen: (state) => {
			state.status = WsStatus.ONLINE;
		},
		allOrdersOnError: (state, action) => {
			state.error = action.payload;
		},
		allOrdersOnMessage: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const {
	allOrdersOnConnecting,
	allOrdersOnOpen,
	allOrdersOnClose,
	allOrdersOnError,
	allOrdersOnMessage,
	allOrdersConnect,
	allOrdersDisconnect,
} = alOrdersWsSlice.actions;

export default alOrdersWsSlice.reducer;
