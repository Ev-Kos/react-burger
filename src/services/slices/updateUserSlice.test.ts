import { updateToken } from '@/utils/api/update-token';
import { updateUserApi } from '@/utils/api/update-user';
import updateUserSlice, {
	fetchUpdateUser,
	initialState,
} from './updateUserSlice';
import { configureStore } from '@reduxjs/toolkit';
import { vi, type Mock } from 'vitest';

const mockUserData = {
	name: 'test1',
};

const makeStore = () => configureStore({ reducer: { updateUserSlice } });
let store: ReturnType<typeof makeStore>;

vi.mock('@/utils/api/update-token', () => ({
	updateToken: vi.fn(),
}));

vi.mock('@/utils/api/update-user', () => ({
	updateUserApi: vi.fn(),
}));

const mockUpdateUserApi = updateUserApi as Mock;
const mockUpdateTokenApi = updateToken as Mock;

describe('updateUser slice', () => {
	describe('fetchUpdateUser thunk', () => {
		beforeEach(() => {
			vi.clearAllMocks();
			store = makeStore();
		});

		it('should successful update', async () => {
			mockUpdateUserApi.mockResolvedValue({ success: true });
			await store.dispatch(fetchUpdateUser(mockUserData));
			expect(updateUserApi).toHaveBeenCalledTimes(1);
		});

		it('should handle jwt expired error and retry', async () => {
			mockUpdateUserApi.mockRejectedValueOnce({
				message: 'jwt expired',
			});
			mockUpdateTokenApi.mockResolvedValueOnce({
				accessToken: 'new-token',
			});
			mockUpdateUserApi.mockResolvedValueOnce({
				success: true,
			});

			const result = await store.dispatch(fetchUpdateUser(mockUserData));

			expect(result.type).toBe('updateUser/fetchUpdateUser/fulfilled');
			expect(updateUserApi).toHaveBeenCalledTimes(2);
			expect(updateToken).toHaveBeenCalledTimes(1);
		});

		it('should handle other errors', async () => {
			mockUpdateUserApi.mockRejectedValueOnce({
				message: 'Server error',
			});
			const result = await store.dispatch(fetchUpdateUser(mockUserData));

			expect(result.type).toBe('updateUser/fetchUpdateUser/rejected');
			expect(updateUserApi).toHaveBeenCalledTimes(1);
			expect(updateToken).not.toHaveBeenCalled();
		});

		it('should handle error after token refresh', async () => {
			mockUpdateUserApi
				.mockRejectedValueOnce({ message: 'jwt expired' })
				.mockRejectedValueOnce({ message: 'New error' });

			mockUpdateTokenApi.mockResolvedValueOnce({});

			const result = await store.dispatch(fetchUpdateUser(mockUserData));
			expect(result.type).toBe('updateUser/fetchUpdateUser/rejected');
		});
	});

	describe('updateUser slice reducer', () => {
		it('initializes correctly', () => {
			const state = updateUserSlice(undefined, { type: '' });
			expect(state).toEqual(initialState);
		});

		it('update user pending', () => {
			const action = fetchUpdateUser.pending('', mockUserData);
			const nextState = updateUserSlice(initialState, action);

			expect(nextState).toEqual({
				request: true,
				failed: false,
			});
		});

		it('update user fulfilled', () => {
			const action = fetchUpdateUser.fulfilled(undefined, '', mockUserData);
			const nextState = updateUserSlice(initialState, action);

			expect(nextState).toEqual({
				request: false,
				failed: false,
			});
		});

		it('update user rejected', () => {
			const action = fetchUpdateUser.rejected(new Error(), '', mockUserData);
			const nextState = updateUserSlice(initialState, action);

			expect(nextState).toEqual({
				request: false,
				failed: true,
			});
		});
	});
});
