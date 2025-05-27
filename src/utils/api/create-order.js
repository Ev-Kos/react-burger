import { BASE_URL } from '../constants';
import { checkResponse, setHeadersWithContentType } from '.';

export const createOrderApi = (data) => {
	return fetch(`${BASE_URL}orders`, {
		method: 'POST',
		headers: setHeadersWithContentType,
		body: JSON.stringify(data),
	}).then((res) => checkResponse(res));
};
