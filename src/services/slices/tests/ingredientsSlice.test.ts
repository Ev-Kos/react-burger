import { configureStore } from '@reduxjs/toolkit';
import { type Mock, vi } from 'vitest';
import ingredientsSlice, {
	fetchIngredients,
	initialState,
	setIngredientForShowDetail,
} from '../ingredientsSlice';
import { getIngredientsApi } from '@/utils/api/get-ingredients';

const ingredients = [
	{
		_id: '60666c42cc7b410027a1a9b2',
		name: 'Флюоресцентная булка R2-D3',
		type: 'bun',
		proteins: 44,
		fat: 26,
		carbohydrates: 85,
		calories: 643,
		price: 988,
		image: 'https://code.s3.yandex.net/react/code/bun-01.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
		__v: 0,
		key: '1',
	},
	{
		_id: '60666c42cc7b410027a1a9b3',
		name: 'Филе Люминесцентного тетраодонтимформа',
		type: 'main',
		proteins: 44,
		fat: 26,
		carbohydrates: 85,
		calories: 643,
		price: 988,
		image: 'https://code.s3.yandex.net/react/code/meat-03.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
		__v: 0,
	},
];

const makeStore = () => configureStore({ reducer: { ingredientsSlice } });
let store: ReturnType<typeof makeStore>;

vi.mock('@/utils/api/get-ingredients', () => ({
	getIngredientsApi: vi.fn(),
}));

const mockGetIngredientsApi = getIngredientsApi as Mock;

describe('ingredientsSlice', () => {
	describe('fetchIngredients thunk', () => {
		beforeEach(() => {
			vi.clearAllMocks();
			store = makeStore();
		});

		it('should successful', async () => {
			mockGetIngredientsApi.mockResolvedValue({ data: ingredients });
			await store.dispatch(fetchIngredients());

			expect(getIngredientsApi).toHaveBeenCalledTimes(1);
		});

		it('should handle error', async () => {
			mockGetIngredientsApi.mockRejectedValueOnce({ message: 'Server error' });
			const result = await store.dispatch(fetchIngredients());

			expect(result.type).toBe('ingredients/fetchIngredients/rejected');
			expect(getIngredientsApi).toHaveBeenCalledTimes(1);
		});
	});

	describe('ingredientsSlice reducer', () => {
		it('initializes correctly', () => {
			const state = ingredientsSlice(undefined, { type: '' });
			expect(state).toEqual(initialState);
		});

		it('setIngredientForShowDetail', () => {
			const action = setIngredientForShowDetail(ingredients[0]._id);
			const state = ingredientsSlice(
				{ ...initialState, ingredients: ingredients },
				action
			);
			expect(state.ingredientDetail).toEqual(ingredients[0]);
		});

		it('pending', () => {
			const action = fetchIngredients.pending('');
			const nextState = ingredientsSlice(initialState, action);

			expect(nextState).toEqual({
				request: true,
				failed: false,
				ingredients: [],
				ingredientDetail: null,
			});
		});

		it('fulfilled', () => {
			const action = fetchIngredients.fulfilled(ingredients, '');
			const nextState = ingredientsSlice(initialState, action);

			expect(nextState).toEqual({
				request: false,
				failed: false,
				ingredients: ingredients,
				ingredientDetail: null,
			});
		});

		it('rejected', () => {
			const action = fetchIngredients.rejected(new Error('error'), '');
			expect(action.type).toBe('ingredients/fetchIngredients/rejected');

			const nextState = ingredientsSlice(initialState, action);

			expect(nextState).toEqual({
				request: false,
				failed: true,
				ingredients: [],
				ingredientDetail: null,
			});
		});
	});
});
