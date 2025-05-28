import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@/utils/api/get-ingredients';

const initialState = {
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
			typeof action.payload === 'string'
				? (state.ingredientDetail = state.ingredients.find(
						(item) => item._id === action.payload
					))
				: (state.ingredientDetail = null);
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
export const ingredientDetailState = (state) =>
	state.ingredientsSlice.ingredientDetail;
export default ingredientsSlice.reducer;
