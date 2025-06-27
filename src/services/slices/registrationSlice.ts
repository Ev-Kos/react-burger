import { registrationApi } from '@/utils/api/registration';
import { TInfoResponse, TUserData } from '@/utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type TInitialState = {
	request: boolean;
	failed: boolean;
	error: TInfoResponse | null;
};

const initialState: TInitialState = {
	request: false,
	failed: false,
	error: null,
};

export const fetchRegistrUser = createAsyncThunk(
	'registration/fetchRegistrUser',
	async (data: Partial<TUserData>, { rejectWithValue }) => {
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
	reducers: {},
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
			state.error = action.payload as TInfoResponse;
		});
	},
});

export const registrationSliceState = (state: RootState) =>
	state.registrationSlice;
export default registrationSlice.reducer;
