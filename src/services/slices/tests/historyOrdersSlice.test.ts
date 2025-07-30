import historyOrdersWsSlice, {
	historyOrdersOnConnecting,
	historyOrdersOnOpen,
	historyOrdersOnClose,
	historyOrdersOnError,
	historyOrdersOnMessage,
	initialState,
} from '../historyOrdersSlice';
import { WsStatus } from '@/utils/types';

const mockData = {
	data: {
		success: true,
		orders: [
			{
				_id: '1',
				status: 'done',
				ingredients: [],
				name: 'Order 1',
				createdAt: '',
				updatedAt: '',
				number: 1,
			},
			{
				_id: '2',
				status: 'pending',
				ingredients: [],
				name: 'Order 2',
				createdAt: '',
				updatedAt: '',
				number: 2,
			},
		],
		total: 100,
		totalToday: 10,
	},
};

describe('historyOrdersWsSlice', () => {
	it('initializes correctly', () => {
		const state = historyOrdersWsSlice(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('historyOrdersOnConnecting', () => {
		const state = historyOrdersWsSlice(
			initialState,
			historyOrdersOnConnecting()
		);
		expect(state).toEqual({
			...initialState,
			status: WsStatus.CONNECTING,
		});
	});

	it('historyOrdersOnOpen', () => {
		const state = historyOrdersWsSlice(initialState, historyOrdersOnOpen());
		expect(state).toEqual({
			...initialState,
			status: WsStatus.ONLINE,
		});
	});

	it('historyOrdersOnClose', () => {
		const modifiedState = {
			status: WsStatus.ONLINE,
			data: mockData.data,
			error: null,
		};

		const state = historyOrdersWsSlice(modifiedState, historyOrdersOnClose());
		expect(state).toEqual({
			...initialState,
			status: WsStatus.OFFLINE,
			data: mockData.data,
		});
	});

	it('historyOrdersOnError', () => {
		const action = historyOrdersOnError('Connection error');
		const state = historyOrdersWsSlice(initialState, action);

		expect(state).toEqual({
			...initialState,
			error: 'Connection error',
			status: WsStatus.OFFLINE,
		});
	});

	it('historyOrdersOnMessage', () => {
		const action = historyOrdersOnMessage(mockData);
		const state = historyOrdersWsSlice(initialState, action);

		expect(state).toEqual({
			...initialState,
			data: mockData,
		});
	});

	it('should not modify state for historyOrdersConnect and historyOrdersDisconnect', () => {
		const connectAction = {
			type: 'historyOrdersConnect',
			payload: 'wss://example.com',
		};
		const disconnectAction = { type: 'historyOrdersDisconnect' };

		const stateAfterConnect = historyOrdersWsSlice(initialState, connectAction);
		expect(stateAfterConnect).toEqual(initialState);

		const stateAfterDisconnect = historyOrdersWsSlice(
			initialState,
			disconnectAction
		);
		expect(stateAfterDisconnect).toEqual(initialState);
	});
});
