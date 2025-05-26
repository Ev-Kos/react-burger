import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	ingredients: [],
};

const selectedIngredientsSlice = createSlice({
	name: 'selectedIngredients',
	initialState,
	reducers: {
		addIngredient(state, action) {
			state.ingredients = [...state.ingredients, action.payload];
		},
		deleteIngredient(state, action) {
			state.ingredients = [
				...state.ingredients.filter((item) => item._id !== action.payload),
			];
		},
	},
});

export const { addIngredient, deleteIngredient } =
	selectedIngredientsSlice.actions;
export const selectedIngredientsState = (state) =>
	state.selectedIngredientsSlice.ingredients;
export default selectedIngredientsSlice.reducer;
