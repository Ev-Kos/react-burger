import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getWsState = (state: RootState) => state.wsSlice;

export const wsSelectors = {
	getOrders: createSelector(getWsState, (state) => state.data),
	getWsStatus: createSelector(getWsState, (state) => state.status),
	getWsError: createSelector(getWsState, (state) => state.error),
};
