import userSlice, { initialState, setUser } from './userSlice';

const user = {
	email: 'test@test.ru',
	password: 'test',
	name: 'test',
};

describe('user slice', () => {
	it('initializes correctly', () => {
		const state = userSlice(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('set user', () => {
		const action = setUser(user);
		const state = userSlice(initialState, action);

		expect(state.user).toEqual(user);
	});
});
