import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import ingredientsSlice from './slices/ingredientsSlice';
import selectedIngredientsSlice from './slices/selectedIngredients';
import createOrderSlice from './slices/createOrderSlice';

const reducer = combineReducers({
	ingredientsSlice,
	selectedIngredientsSlice,
	createOrderSlice,
});

export const store = configureStore({
	reducer,
});
