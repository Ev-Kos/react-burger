import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import ingredientsSlice from './slices/ingredientsSlice';
import selectedIngredientsSlice from './slices/selectedIngredients';

const reducer = combineReducers({
	ingredientsSlice,
	selectedIngredientsSlice,
});

export const store = configureStore({
	reducer,
});
