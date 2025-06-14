import { checkResponse, setHeadersWithContentType } from '.';
import { BASE_URL } from '../constants';

export const logoutApi = (token) => {
	return fetch(`${BASE_URL}auth/logout`, {
		method: 'POST',
		headers: setHeadersWithContentType,
		body: JSON.stringify({
			token: token,
		}),
	}).then((res) => checkResponse(res));
};
