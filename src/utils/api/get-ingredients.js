import { BASE_URL } from '../constants';
import { checkResponse } from './check-response';

export const getIngredientsApi = () => {
	return fetch(`${BASE_URL}ingredients`).then((res) => checkResponse(res));
};
