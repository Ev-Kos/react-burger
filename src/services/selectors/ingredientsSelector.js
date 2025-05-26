import { createSelector } from '@reduxjs/toolkit';

const getIngredientsSliceState = (state) => state.ingredientsSlice;

export const ingredientsSelectors = {
	getIngredients: createSelector(
		getIngredientsSliceState,
		(state) => state.ingredients
	),
	getStatusFlags: createSelector(getIngredientsSliceState, (state) => ({
		failed: state.failed,
		isLoading: state.isLoading,
	})),
};
