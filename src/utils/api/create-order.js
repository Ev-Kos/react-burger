import { BASE_URL } from '../constants';
import { checkResponse, setHeadersWithAuth } from '.';

export const createOrderApi = (data) => {
	return fetch(`${BASE_URL}orders`, {
		method: 'POST',
		headers: setHeadersWithAuth(),
		body: JSON.stringify(data),
	}).then((res) => checkResponse(res));
};
