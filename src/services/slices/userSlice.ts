import { TUserData } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';

type TInitialState = {
	user: TUserData | null;
};

const initialState: TInitialState = {
	user: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
		},
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
