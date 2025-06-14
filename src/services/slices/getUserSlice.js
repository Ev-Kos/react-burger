import { getUserApi } from '@/utils/api/get-user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateToken } from '@/utils/api/update-token';

const initialState = {
	request: false,
	failed: false,
};

export const fetchGetUser = createAsyncThunk(
	'getUser/fetchGetUser',
	async () => {
		try {
			const response = await getUserApi();
			return response;
		} catch (error) {
			console.log(error);
			if (error === 'Ошибка: 403') {
				updateToken()
					.then((res) => {
						localStorage.setItem('refreshToken', res.refreshToken);
						localStorage.setItem('accessToken', res.accessToken);
					})
					.catch((e) => {
						console.error(`Ошибка: ${e}`);
					});
			}
		}
	}
);

const getUserSlice = createSlice({
	name: 'getUser',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchGetUser.pending, (state) => {
			state.request = true;
			state.failed = false;
		});
		builder.addCase(fetchGetUser.fulfilled, (state) => {
			state.request = false;
		});
		builder.addCase(fetchGetUser.rejected, (state) => {
			state.request = false;
			state.failed = true;
		});
	},
});

export const getUserSliceState = (state) => state.getUserSlice;
export default getUserSlice.reducer;
