import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateToken } from '@/utils/api/update-token';
import { updateUserApi } from '@/utils/api/update-user';
import { TUserData } from '@/utils/types';
import { RootState } from '../store';

type TInitialState = {
	request: boolean;
	failed: boolean;
};

const initialState: TInitialState = {
	request: false,
	failed: false,
};

export const fetchUpdateUser = createAsyncThunk(
	'updateUser/fetchUpdateUser',
	async (data: Partial<TUserData>) => {
		try {
			return await updateUserApi(data);
		} catch (error) {
			if (typeof error === 'object' && error !== null && 'message' in error) {
				if (error.message === 'jwt expired') {
					await updateToken();
					return await updateUserApi(data);
				}
			}
		}
	}
);

const updateUserSlice = createSlice({
	name: 'updateUser',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUpdateUser.pending, (state) => {
			state.request = true;
			state.failed = false;
		});
		builder.addCase(fetchUpdateUser.fulfilled, (state) => {
			state.request = false;
		});
		builder.addCase(fetchUpdateUser.rejected, (state) => {
			state.request = false;
			state.failed = true;
		});
	},
});

export const updateUserSliceState = (state: RootState) => state.updateUserSlice;
export default updateUserSlice.reducer;
