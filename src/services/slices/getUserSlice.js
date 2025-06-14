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
			return await getUserApi();
		} catch (error) {
			if (error.message === 'jwt expired') {
				await updateToken();
				return await getUserApi();
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
