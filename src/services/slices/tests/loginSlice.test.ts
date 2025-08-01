import { loginApi } from '@/utils/api/login';
import { configureStore } from '@reduxjs/toolkit';
import { type Mock, vi } from 'vitest';
import loginSlice, { fetchLogin, initialState } from '../loginSlice';

const mockData = {
	email: 'test@test.ru',
	password: 'test',
};

const successResponse = {
	success: true,
	accessToken: 'accessToken',
	refreshToken: 'refreshToken',
	user: {
		email: 'test@test.ru',
		name: 'test',
	},
};

const makeStore = () => configureStore({ reducer: { loginSlice } });
let store: ReturnType<typeof makeStore>;

vi.mock('@/utils/api/login', () => ({
	loginApi: vi.fn(),
}));

const mockLoginApi = loginApi as Mock;

describe('loginSlice', () => {
	describe('fetchLogin thunk', () => {
		let setItemSpy: ReturnType<typeof vi.spyOn>;

		beforeEach(() => {
			vi.clearAllMocks();
			store = makeStore();
			setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
		});

		afterEach(() => {
			setItemSpy.mockRestore();
		});

		it('should successful login', async () => {
			mockLoginApi.mockResolvedValue(successResponse);
			await store.dispatch(fetchLogin(mockData));

			expect(loginApi).toHaveBeenCalledTimes(1);
			expect(loginApi).toHaveBeenCalledWith(mockData);

			expect(setItemSpy).toHaveBeenCalledWith('refreshToken', 'refreshToken');
			expect(setItemSpy).toHaveBeenCalledWith('accessToken', 'accessToken');
		});

		it('should handle error', async () => {
			mockLoginApi.mockRejectedValueOnce({ message: 'Server error' });
			const result = await store.dispatch(fetchLogin(mockData));

			expect(result.type).toBe('login/fetchLogin/rejected');
			expect(loginApi).toHaveBeenCalledTimes(1);

			expect(setItemSpy).not.toHaveBeenCalled();
		});
	});

	describe('loginSlice reducer', () => {
		it('initializes correctly', () => {
			const state = loginSlice(undefined, { type: '' });
			expect(state).toEqual(initialState);
		});

		it('login pending', () => {
			const action = fetchLogin.pending('', mockData);
			const nextState = loginSlice(initialState, action);

			expect(nextState).toEqual({
				request: true,
				failed: false,
			});
		});

		it('login fulfilled', () => {
			const action = fetchLogin.fulfilled(successResponse, '', mockData);
			const nextState = loginSlice(initialState, action);

			expect(nextState).toEqual({
				request: false,
				failed: false,
			});
		});

		it('registration rejected', () => {
			const error = {
				success: false,
				message: 'error',
			};

			const action = fetchLogin.rejected(
				new Error('error'),
				'',
				mockData,
				error
			);
			expect(action.type).toBe('login/fetchLogin/rejected');

			const nextState = loginSlice(initialState, action);

			expect(nextState).toEqual({
				request: false,
				failed: true,
			});
		});
	});
});
