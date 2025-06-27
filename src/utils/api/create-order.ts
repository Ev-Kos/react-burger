import { BASE_URL } from '../constants';
import { checkResponse, setHeadersWithAuth } from '.';
import { TGetOrderNumber } from '../types';

export const createOrderApi = (data: string[]) => {
	return fetch(`${BASE_URL}orders`, {
		method: 'POST',
		headers: setHeadersWithAuth(),
		body: JSON.stringify({
			ingredients: data,
		}),
	}).then((res) => checkResponse<TGetOrderNumber>(res));
};
