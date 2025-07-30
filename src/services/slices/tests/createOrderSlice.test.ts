import { updateToken } from '@/utils/api/update-token';
import { configureStore } from '@reduxjs/toolkit';
import { vi, type Mock } from 'vitest';
import createOrderSlice, {
	fetchCreateOrder,
	initialState,
} from '../createOrderSlice';
import { createOrderApi } from '@/utils/api/create-order';

const mockData = [
	'60666c42cc7b410027a1a9b3',
	'60666c42cc7b410027a1a9be',
	'60666c42cc7b410027a1a9bd',
];

const makeStore = () => configureStore({ reducer: { createOrderSlice } });
let store: ReturnType<typeof makeStore>;

vi.mock('@/utils/api/update-token', () => ({
	updateToken: vi.fn(),
}));

vi.mock('@/utils/api/create-order', () => ({
	createOrderApi: vi.fn(),
}));

const mockCreateOrderApi = createOrderApi as Mock;
const mockUpdateTokenApi = updateToken as Mock;

describe('createOrderSlice', () => {
	describe('fetchCreateOrder thunk', () => {
		beforeEach(() => {
			vi.clearAllMocks();
			store = makeStore();
		});

		it('should successful', async () => {
			mockCreateOrderApi.mockResolvedValue({ success: true });
			await store.dispatch(fetchCreateOrder(mockData));
			expect(createOrderApi).toHaveBeenCalledTimes(1);
		});

		it('should handle jwt expired error and retry', async () => {
			mockCreateOrderApi.mockRejectedValueOnce({
				message: 'jwt expired',
			});
			mockUpdateTokenApi.mockResolvedValueOnce({
				accessToken: 'new-token',
			});
			mockCreateOrderApi.mockResolvedValueOnce({
				success: true,
			});

			const result = await store.dispatch(fetchCreateOrder(mockData));

			expect(result.type).toBe('order/fetchCreateOrder/rejected');
			expect(createOrderApi).toHaveBeenCalledTimes(2);
			expect(updateToken).toHaveBeenCalledTimes(1);
		});

		it('should handle other errors', async () => {
			mockCreateOrderApi.mockRejectedValueOnce({
				message: 'Server error',
			});
			const result = await store.dispatch(fetchCreateOrder(mockData));

			expect(result.type).toBe('order/fetchCreateOrder/rejected');
			expect(createOrderApi).toHaveBeenCalledTimes(1);
			expect(updateToken).not.toHaveBeenCalled();
		});

		it('should handle error after token refresh', async () => {
			mockCreateOrderApi
				.mockRejectedValueOnce({ message: 'jwt expired' })
				.mockRejectedValueOnce({ message: 'New error' });

			mockUpdateTokenApi.mockResolvedValueOnce({});

			const result = await store.dispatch(fetchCreateOrder(mockData));
			expect(result.type).toBe('order/fetchCreateOrder/rejected');
		});
	});

	describe('createOrderSlice reducer', () => {
		it('initializes correctly', () => {
			const state = createOrderSlice(undefined, { type: '' });
			expect(state).toEqual(initialState);
		});

		it('createOrder pending', () => {
			const action = fetchCreateOrder.pending('', mockData);
			const nextState = createOrderSlice(initialState, action);

			expect(nextState).toEqual({
				...initialState,
				request: true,
				failed: false,
			});
		});

		it('createOrder fulfilled', () => {
			const action = fetchCreateOrder.fulfilled(10, '', mockData);
			const nextState = createOrderSlice(initialState, action);

			expect(nextState).toEqual({
				request: false,
				failed: false,
				orderNumber: 10,
			});
		});

		it('createOrder rejected', () => {
			const action = fetchCreateOrder.rejected(new Error(), '', mockData);
			const nextState = createOrderSlice(initialState, action);

			expect(nextState).toEqual({
				...initialState,
				request: false,
				failed: true,
			});
		});
	});
});
