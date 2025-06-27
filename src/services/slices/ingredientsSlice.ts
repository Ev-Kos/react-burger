import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@/utils/api/get-ingredients';
import { TIngredient } from '@/utils/types';
import { RootState } from '../store';

type TInitialState = {
	ingredients: TIngredient[];
	request: boolean;
	failed: boolean;
	ingredientDetail: TIngredient | null;
};

const initialState: TInitialState = {
	ingredients: [],
	request: false,
	failed: false,
	ingredientDetail: null,
};

export const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredients',
	async () => {
		const response = await getIngredientsApi();
		return response.data;
	}
);

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		setIngredientForShowDetail(state, action) {
			if (action.payload) {
				const foundIngredient = state.ingredients.find(
					(item) => item._id === action.payload
				);
				state.ingredientDetail = foundIngredient || null;
			} else {
				state.ingredientDetail = null;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchIngredients.pending, (state) => {
			state.request = true;
			state.failed = false;
		});

		builder.addCase(fetchIngredients.fulfilled, (state, action) => {
			state.request = false;
			state.ingredients = action.payload;
		});

		builder.addCase(fetchIngredients.rejected, (state) => {
			state.request = false;
			state.failed = true;
		});
	},
});

export const { setIngredientForShowDetail } = ingredientsSlice.actions;
export const ingredientDetailState = (state: RootState) =>
	state.ingredientsSlice.ingredientDetail;
export default ingredientsSlice.reducer;
