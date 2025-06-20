import { registrationApi } from '@/utils/api/registration';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	request: false,
	failed: false,
	error: null,
};

export const fetchRegistrUser = createAsyncThunk(
	'registration/fetchRegistrUser',
	async (data, { rejectWithValue }) => {
		try {
			const response = await registrationApi(data);
			localStorage.setItem('refreshToken', response.refreshToken);
			localStorage.setItem('accessToken', response.accessToken);
			return response;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);

const registrationSlice = createSlice({
	name: 'registration',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchRegistrUser.pending, (state) => {
			state.request = true;
			state.failed = false;
			state.error = null;
		});

		builder.addCase(fetchRegistrUser.fulfilled, (state) => {
			state.request = false;
		});

		builder.addCase(fetchRegistrUser.rejected, (state, action) => {
			state.request = false;
			state.failed = true;
			state.error = action.payload;
		});
	},
});

export const registrationSliceState = (state) => state.registrationSlice;
export default registrationSlice.reducer;
