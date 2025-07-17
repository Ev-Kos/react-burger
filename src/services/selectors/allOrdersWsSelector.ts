import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getAllWsState = (state: RootState) => state.alOrdersWsSlice;

export const alOrdersWsSelectors = {
	getOrders: createSelector(getAllWsState, (state) => state.data),
	getWsStatus: createSelector(getAllWsState, (state) => state.status),
	getWsError: createSelector(getAllWsState, (state) => state.error),
};
