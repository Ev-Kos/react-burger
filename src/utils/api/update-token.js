import { checkResponse, setHeadersWithContentType } from '.';
import { BASE_URL } from '../constants';

export const updateToken = () => {
	return fetch(`${BASE_URL}auth/token`, {
		method: 'POST',
		headers: setHeadersWithContentType,
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	}).then((res) => checkResponse(res));
};
