import { createOrderApi } from '@/utils/api/create-order';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	request: false,
	isLoading: false,
	failed: false,
	orderNumber: null,
};

export const fetchCreateOrder = createAsyncThunk(
	'order/fetchCreateOrder',
	async (data) => {
		const response = await createOrderApi(data);
		return response.order.number;
	}
);

const createOrderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setIsLoading(state, action) {
			state.isLoading = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCreateOrder.pending, (state) => {
			state.request = true;
			state.failed = false;
		});

		builder.addCase(fetchCreateOrder.fulfilled, (state, action) => {
			state.request = false;
			state.orderNumber = action.payload;
		});

		builder.addCase(fetchCreateOrder.rejected, (state) => {
			state.request = false;
			state.failed = true;
		});
	},
});

export const createOrderState = (state) => state.createOrderSlice;
export const { setIsLoading } = createOrderSlice.actions;
export default createOrderSlice.reducer;
