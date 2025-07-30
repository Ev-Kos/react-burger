import alOrdersWsSlice, {
	allOrdersOnConnecting,
	allOrdersOnOpen,
	allOrdersOnClose,
	allOrdersOnError,
	allOrdersOnMessage,
	initialState,
} from '../allOrdersWsSlice';
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

describe('alOrdersWsSlice', () => {
	it('initializes correctly', () => {
		const state = alOrdersWsSlice(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('allOrdersOnConnecting', () => {
		const state = alOrdersWsSlice(initialState, allOrdersOnConnecting());
		expect(state).toEqual({
			...initialState,
			status: WsStatus.CONNECTING,
		});
	});

	it('allOrdersOnOpen', () => {
		const state = alOrdersWsSlice(initialState, allOrdersOnOpen());
		expect(state).toEqual({
			...initialState,
			status: WsStatus.ONLINE,
		});
	});

	it('allOrdersOnClose', () => {
		const modifiedState = {
			status: WsStatus.ONLINE,
			data: mockData.data,
			error: null,
		};

		const state = alOrdersWsSlice(modifiedState, allOrdersOnClose());
		expect(state).toEqual({
			...initialState,
			status: WsStatus.OFFLINE,
			data: mockData.data,
		});
	});

	it('allOrdersOnError', () => {
		const action = allOrdersOnError('Connection error');
		const state = alOrdersWsSlice(initialState, action);

		expect(state).toEqual({
			...initialState,
			error: 'Connection error',
			status: WsStatus.OFFLINE,
		});
	});

	it('allOrdersOnMessage', () => {
		const action = allOrdersOnMessage(mockData);
		const state = alOrdersWsSlice(initialState, action);

		expect(state).toEqual({
			...initialState,
			data: mockData,
		});
	});

	it('should not modify state for allOrdersConnect and allOrdersDisconnect', () => {
		const connectAction = {
			type: 'allOrdersConnect',
			payload: 'wss://example.com',
		};
		const disconnectAction = { type: 'allOrdersDisconnect' };

		const stateAfterConnect = alOrdersWsSlice(initialState, connectAction);
		expect(stateAfterConnect).toEqual(initialState);

		const stateAfterDisconnect = alOrdersWsSlice(
			initialState,
			disconnectAction
		);
		expect(stateAfterDisconnect).toEqual(initialState);
	});
});
