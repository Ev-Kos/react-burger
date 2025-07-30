import { configureStore } from '@reduxjs/toolkit';
import registrationSlice, {
	fetchRegistrUser,
	initialState,
} from '../registrationSlice';
import { type Mock, vi } from 'vitest';
import { registrationApi } from '@/utils/api/registration';

const mockData = {
	email: 'test@test.ru',
	password: 'test',
	name: 'test',
};

const successResponse = {
	success: true,
	accessToken: 'accessToken',
	refreshToken: 'refreshToken',
	user: mockData,
};

const makeStore = () => configureStore({ reducer: { registrationSlice } });
let store: ReturnType<typeof makeStore>;

vi.mock('@/utils/api/registration', () => ({
	registrationApi: vi.fn(),
}));

const mockRegistrationApi = registrationApi as Mock;

describe('registrationSlice', () => {
	describe('fetchRegistrUser thunk', () => {
		let setItemSpy: ReturnType<typeof vi.spyOn>;

		beforeEach(() => {
			vi.clearAllMocks();
			store = makeStore();
			setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
		});

		afterEach(() => {
			setItemSpy.mockRestore();
		});

		it('should successful registr', async () => {
			mockRegistrationApi.mockResolvedValue(successResponse);
			await store.dispatch(fetchRegistrUser(mockData));

			expect(registrationApi).toHaveBeenCalledTimes(1);
			expect(registrationApi).toHaveBeenCalledWith(mockData);

			expect(setItemSpy).toHaveBeenCalledWith('refreshToken', 'refreshToken');
			expect(setItemSpy).toHaveBeenCalledWith('accessToken', 'accessToken');
		});

		it('should handle error', async () => {
			mockRegistrationApi.mockRejectedValueOnce({ message: 'Server error' });
			const result = await store.dispatch(fetchRegistrUser(mockData));

			expect(result.type).toBe('registration/fetchRegistrUser/rejected');
			expect(registrationApi).toHaveBeenCalledTimes(1);

			expect(setItemSpy).not.toHaveBeenCalled();
		});
	});

	describe('registrationSlice reducer', () => {
		it('initializes correctly', () => {
			const state = registrationSlice(undefined, { type: '' });
			expect(state).toEqual(initialState);
		});

		it('registration pending', () => {
			const action = fetchRegistrUser.pending('', mockData);
			const nextState = registrationSlice(initialState, action);

			expect(nextState).toEqual({
				request: true,
				failed: false,
				error: null,
			});
		});

		it('registration fulfilled', () => {
			const action = fetchRegistrUser.fulfilled(successResponse, '', mockData);
			const nextState = registrationSlice(initialState, action);

			expect(nextState).toEqual({
				request: false,
				failed: false,
				error: null,
			});
		});

		it('registration rejected', () => {
			const error = {
				success: false,
				message: 'error',
			};

			const action = fetchRegistrUser.rejected(
				new Error('error'),
				'',
				mockData,
				error
			);
			expect(action.type).toBe('registration/fetchRegistrUser/rejected');

			const nextState = registrationSlice(initialState, action);

			expect(nextState).toEqual({
				request: false,
				failed: true,
				error: error,
			});
		});
	});
});
