import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	ingredients: [],
};

const selectedIngredientsSlice = createSlice({
	name: 'selectedIngredients',
	initialState,
	reducers: {
		setIngredients(state, action) {
			state.ingredients = action.payload;
		},
		addIngredient(state, action) {
			state.ingredients = [...state.ingredients, action.payload];
		},
		deleteIngredient(state, action) {
			state.ingredients = [
				...state.ingredients.filter((item) => item.key !== action.payload),
			];
		},
	},
});

export const { addIngredient, deleteIngredient, setIngredients } =
	selectedIngredientsSlice.actions;
export const selectedIngredientsState = (state) =>
	state.selectedIngredientsSlice.ingredients;
export default selectedIngredientsSlice.reducer;
