import { checkResponse, setHeadersWithContentType } from '.';
import { BASE_URL } from '../constants';

export const loginApi = (data) => {
	return fetch(`${BASE_URL}auth/login`, {
		method: 'POST',
		headers: setHeadersWithContentType,
		body: JSON.stringify(data),
	}).then((res) => checkResponse(res));
};
