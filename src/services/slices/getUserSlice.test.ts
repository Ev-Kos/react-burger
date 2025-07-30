import { updateToken } from '@/utils/api/update-token';
import { configureStore } from '@reduxjs/toolkit';
import { vi, type Mock } from 'vitest';
import getUserSlice, { fetchGetUser, initialState } from './getUserSlice';
import { getUserApi } from '@/utils/api/get-user';

const makeStore = () => configureStore({ reducer: { getUserSlice } });
let store: ReturnType<typeof makeStore>;

vi.mock('@/utils/api/update-token', () => ({
	updateToken: vi.fn(),
}));

vi.mock('@/utils/api/get-user', () => ({
	getUserApi: vi.fn(),
}));

const mockGetUserApiApi = getUserApi as Mock;
const mockUpdateTokenApi = updateToken as Mock;

describe('getUserSlice', () => {
	describe('fetchGetUser thunk', () => {
		beforeEach(() => {
			vi.clearAllMocks();
			store = makeStore();
		});

		it('should successful', async () => {
			mockGetUserApiApi.mockResolvedValue({ success: true });
			await store.dispatch(fetchGetUser());
			expect(getUserApi).toHaveBeenCalledTimes(1);
		});

		it('should handle jwt expired error and retry', async () => {
			mockGetUserApiApi.mockRejectedValueOnce({
				message: 'jwt expired',
			});
			mockUpdateTokenApi.mockResolvedValueOnce({
				accessToken: 'new-token',
			});
			mockGetUserApiApi.mockResolvedValueOnce({
				success: true,
			});

			const result = await store.dispatch(fetchGetUser());

			expect(result.type).toBe('getUser/fetchGetUser/fulfilled');
			expect(getUserApi).toHaveBeenCalledTimes(2);
			expect(updateToken).toHaveBeenCalledTimes(1);
		});

		it('should handle other errors', async () => {
			mockGetUserApiApi.mockRejectedValueOnce({
				message: 'Server error',
			});
			const result = await store.dispatch(fetchGetUser());

			expect(result.type).toBe('getUser/fetchGetUser/rejected');
			expect(getUserApi).toHaveBeenCalledTimes(1);
			expect(updateToken).not.toHaveBeenCalled();
		});

		it('should handle error after token refresh', async () => {
			mockGetUserApiApi
				.mockRejectedValueOnce({ message: 'jwt expired' })
				.mockRejectedValueOnce({ message: 'New error' });

			mockUpdateTokenApi.mockResolvedValueOnce({});

			const result = await store.dispatch(fetchGetUser());
			expect(result.type).toBe('getUser/fetchGetUser/rejected');
		});
	});

	describe('getUserSlice reducer', () => {
		it('initializes correctly', () => {
			const state = getUserSlice(undefined, { type: '' });
			expect(state).toEqual(initialState);
		});

		it('getUser pending', () => {
			const action = fetchGetUser.pending('');
			const nextState = getUserSlice(initialState, action);

			expect(nextState).toEqual({
				request: true,
				failed: false,
			});
		});

		it('getUser fulfilled', () => {
			const action = fetchGetUser.fulfilled(undefined, '');
			const nextState = getUserSlice(initialState, action);

			expect(nextState).toEqual({
				request: false,
				failed: false,
			});
		});

		it('getUser rejected', () => {
			const action = fetchGetUser.rejected(new Error(), '');
			const nextState = getUserSlice(initialState, action);

			expect(nextState).toEqual({
				request: false,
				failed: true,
			});
		});
	});
});
