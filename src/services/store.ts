import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import ingredientsSlice from './slices/ingredientsSlice';
import selectedIngredientsSlice from './slices/selectedIngredients';
import createOrderSlice from './slices/createOrderSlice';
import userSlice from './slices/userSlice';
import registrationSlice from './slices/registrationSlice';
import loginSlice from './slices/loginSlice';
import getUserSlice from './slices/getUserSlice';
import updateUserSlice from './slices/updateUserSlice';
import { useDispatch } from 'react-redux';
import alOrdersWsSlice, {
	allOrdersConnect,
	allOrdersDisconnect,
	allOrdersOnClose,
	allOrdersOnConnecting,
	allOrdersOnError,
	allOrdersOnMessage,
	allOrdersOnOpen,
} from './slices/allOrdersWsSlice';
import { wsMiddleware } from './middleware/ws-middleware';

import feedDetailSlice from './slices/feedDetailSlice';
import historyOrdersWsSlice, {
	historyOrdersConnect,
	historyOrdersDisconnect,
	historyOrdersOnClose,
	historyOrdersOnConnecting,
	historyOrdersOnError,
	historyOrdersOnMessage,
	historyOrdersOnOpen,
} from './slices/historyOrdersSlice';

const reducer = combineReducers({
	ingredientsSlice,
	selectedIngredientsSlice,
	createOrderSlice,
	userSlice,
	registrationSlice,
	loginSlice,
	getUserSlice,
	updateUserSlice,
	alOrdersWsSlice,
	feedDetailSlice,
	historyOrdersWsSlice,
});

const allOrdersWsActions = {
	connect: allOrdersConnect,
	disconnect: allOrdersDisconnect,
	onConnecting: allOrdersOnConnecting,
	onOpen: allOrdersOnOpen,
	onClose: allOrdersOnClose,
	onError: allOrdersOnError,
	onMessage: allOrdersOnMessage,
};

const historyOrdersWsActions = {
	connect: historyOrdersConnect,
	disconnect: historyOrdersDisconnect,
	onConnecting: historyOrdersOnConnecting,
	onOpen: historyOrdersOnOpen,
	onClose: historyOrdersOnClose,
	onError: historyOrdersOnError,
	onMessage: historyOrdersOnMessage,
};

const getAllOrdersMiddleware = wsMiddleware(allOrdersWsActions);
const getHistoryOrdersMiddleware = wsMiddleware(historyOrdersWsActions);

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			getAllOrdersMiddleware,
			getHistoryOrdersMiddleware
		);
	},
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
