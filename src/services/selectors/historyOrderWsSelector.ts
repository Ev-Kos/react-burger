import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getHistoryWsState = (state: RootState) => state.historyOrdersWsSlice;

export const historyOrdersWsSelectors = {
	getOrders: createSelector(getHistoryWsState, (state) => state.data),
	getWsStatus: createSelector(getHistoryWsState, (state) => state.status),
	getWsError: createSelector(getHistoryWsState, (state) => state.error),
};
