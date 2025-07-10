import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getUserSliceState = (state: RootState) => state.userSlice;

export const userSelector = {
	user: createSelector(getUserSliceState, (state) => state.user),
};
