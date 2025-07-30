import feedDetailSlice, {
	initialState,
	setOrderNumber,
} from '../feedDetailSlice';

describe('feedDetailSlice', () => {
	it('initializes correctly', () => {
		const state = feedDetailSlice(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('setOrderNumber', () => {
		const action = setOrderNumber(10);
		const state = feedDetailSlice(initialState, action);

		expect(state.orderNumber).toEqual(10);
	});
});
