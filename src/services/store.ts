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
import wsSlice from './slices/wsSlice';
import { wsMiddleware } from './middleware/ws-middleware';
import {
	connect,
	disconnect,
	onConnecting,
	onOpen,
	onClose,
	onError,
	onMessage,
} from './actions/wsActions';

const reducer = combineReducers({
	ingredientsSlice,
	selectedIngredientsSlice,
	createOrderSlice,
	userSlice,
	registrationSlice,
	loginSlice,
	getUserSlice,
	updateUserSlice,
	wsSlice,
});

const wsActions = {
	connect: connect,
	disconnect,
	onConnecting,
	onOpen,
	onClose,
	onError,
	onMessage,
};

const getOrdersMiddleware = wsMiddleware(wsActions);

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(getOrdersMiddleware);
	},
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
