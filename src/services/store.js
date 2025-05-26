import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import ingredientsSlice from './slices/ingredientsSlice';

const reducer = combineReducers({
	ingredientsSlice,
});

export const store = configureStore({
	reducer,
});
