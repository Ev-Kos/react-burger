import { createSelector } from '@reduxjs/toolkit';

const getUserSliceState = (state) => state.userSlice;

export const userSelector = {
	user: createSelector(getUserSliceState, (state) => state.user),
};
