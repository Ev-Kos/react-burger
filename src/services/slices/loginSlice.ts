import { loginApi } from '@/utils/api/login';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TLoginData } from '@/utils/types';

const initialState = {
	request: false,
	failed: false,
};

export const fetchLogin = createAsyncThunk(
	'login/fetchLogin',
	async (data: TLoginData) => {
		const response = await loginApi(data);
		localStorage.setItem('refreshToken', response.refreshToken);
		localStorage.setItem('accessToken', response.accessToken);
		return response;
	}
);

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchLogin.pending, (state) => {
			state.request = true;
			state.failed = false;
		});
		builder.addCase(fetchLogin.fulfilled, (state) => {
			state.request = false;
		});
		builder.addCase(fetchLogin.rejected, (state) => {
			state.request = false;
			state.failed = true;
		});
	},
});

export const loginSliceState = (state: RootState) => state.loginSlice;
export default loginSlice.reducer;
