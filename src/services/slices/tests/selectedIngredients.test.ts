import selectedIngredientsSlice, {
	addIngredient,
	deleteIngredient,
	initialState,
	setIngredients,
} from '../selectedIngredientsSlice';

const ingredient = {
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
};

describe('selected ingredients slice', () => {
	it('initializes correctly', () => {
		const state = selectedIngredientsSlice(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('setIngredients', () => {
		const action = setIngredients([ingredient]);
		const state = selectedIngredientsSlice(initialState, action);

		expect(state.ingredients).toEqual([ingredient]);
	});

	it('addIngredient', () => {
		const action = addIngredient(ingredient);
		const state = selectedIngredientsSlice(initialState, action);

		expect(state.ingredients).toEqual([ingredient]);
	});

	it('deleteIngredient', () => {
		selectedIngredientsSlice(initialState, setIngredients([ingredient]));
		const action = deleteIngredient(ingredient.key);
		const state = selectedIngredientsSlice(initialState, action);

		expect(state.ingredients).toEqual([]);
	});
});
