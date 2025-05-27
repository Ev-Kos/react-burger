import { BASE_URL } from '../constants';
import { checkResponse } from '.';

export const getIngredientsApi = () => {
	return fetch(`${BASE_URL}ingredients`).then((res) => checkResponse(res));
};
