import { TSelectedIngredient } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type TInitialState = {
	ingredients: TSelectedIngredient[];
};

const initialState: TInitialState = {
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
export const selectedIngredientsState = (state: RootState) =>
	state.selectedIngredientsSlice.ingredients;
export default selectedIngredientsSlice.reducer;
