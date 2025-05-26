import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@/utils/api/get-ingredients';

const initialState = {
	ingredients: [],
	failed: false,
	isLoading: true,
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
		setIsLoading(state, action) {
			state.isLoading = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchIngredients.pending, (state) => {
			state.failed = false;
		});

		builder.addCase(fetchIngredients.fulfilled, (state, action) => {
			state.ingredients = action.payload;
		});

		builder.addCase(fetchIngredients.rejected, (state) => {
			state.failed = true;
		});
	},
});

export const { setIsLoading } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
