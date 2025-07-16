import { WsStatus } from '@/utils/constants';
import { createSlice } from '@reduxjs/toolkit';
import {
	onClose,
	onConnecting,
	onError,
	onMessage,
	onOpen,
} from '../actions/wsActions';
import { TFeed } from '@/utils/types';

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

export const wsSlice = createSlice({
	name: 'ws',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(onConnecting, (state) => {
			state.status = WsStatus.CONNECTING;
		});
		builder.addCase(onOpen, (state) => {
			state.status = WsStatus.ONLINE;
		});
		builder.addCase(onClose, (state) => {
			state.status = WsStatus.OFFLINE;
		});
		builder.addCase(onError, (state, action) => {
			state.error = action.payload;
		});
		builder.addCase(onMessage, (state, action) => {
			state.data = action.payload;
		});
	},
});

export default wsSlice.reducer;
