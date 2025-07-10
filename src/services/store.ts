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

const reducer = combineReducers({
	ingredientsSlice,
	selectedIngredientsSlice,
	createOrderSlice,
	userSlice,
	registrationSlice,
	loginSlice,
	getUserSlice,
	updateUserSlice,
});

export const store = configureStore({
	reducer,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
