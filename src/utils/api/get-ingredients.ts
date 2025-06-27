import { BASE_URL } from '../constants';
import { checkResponse } from '.';
import { TGetIngredients } from '../types';

export const getIngredientsApi = () => {
	return fetch(`${BASE_URL}ingredients`).then((res) =>
		checkResponse<TGetIngredients>(res)
	);
};
