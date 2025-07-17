import { createOrderApi } from '@/utils/api/create-order';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { updateToken } from '@/utils/api/update-token';

type TInitialState = {
	request: boolean;
	failed: boolean;
	orderNumber: null | number;
};

const initialState: TInitialState = {
	request: false,
	failed: false,
	orderNumber: null,
};

export const fetchCreateOrder = createAsyncThunk(
	'order/fetchCreateOrder',
	async (data: string[]) => {
		try {
			const response = await createOrderApi(data);
			return response.order.number;
		} catch (error) {
			if (typeof error === 'object' && error !== null && 'message' in error) {
				if (error.message === 'jwt expired') {
					await updateToken();
					const response = await createOrderApi(data);
					return response.order.number;
				}
			}
		}
	}
);

const createOrderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCreateOrder.pending, (state) => {
			state.request = true;
			state.failed = false;
		});

		builder.addCase(fetchCreateOrder.fulfilled, (state, action) => {
			state.request = false;
			state.orderNumber = action.payload ? action.payload : null;
		});

		builder.addCase(fetchCreateOrder.rejected, (state) => {
			state.request = false;
			state.failed = true;
		});
	},
});

export const createOrderState = (state: RootState) => state.createOrderSlice;
export default createOrderSlice.reducer;
