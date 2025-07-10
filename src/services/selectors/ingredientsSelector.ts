import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getIngredientsSliceState = (state: RootState) => state.ingredientsSlice;

export const ingredientsSelectors = {
	getIngredients: createSelector(
		getIngredientsSliceState,
		(state) => state.ingredients
	),
	getStatusFlags: createSelector(getIngredientsSliceState, (state) => ({
		getIngredientsfailed: state.failed,
		getIngredientsReguest: state.request,
	})),
};
