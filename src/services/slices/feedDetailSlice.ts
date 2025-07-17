import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type TInitialState = {
	orderNumber: number | null;
};

const initialState: TInitialState = {
	orderNumber: null,
};

const feedDetailSlice = createSlice({
	name: 'feedDetail',
	initialState,
	reducers: {
		setOrderNumber: (state, action) => {
			state.orderNumber = action.payload;
		},
	},
});

export const { setOrderNumber } = feedDetailSlice.actions;
export const feedDetailSliceState = (state: RootState) =>
	state.feedDetailSlice.orderNumber;
export default feedDetailSlice.reducer;
