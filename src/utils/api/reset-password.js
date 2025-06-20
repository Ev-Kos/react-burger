import { checkResponse, setHeadersWithContentType } from '.';
import { BASE_URL } from '../constants';

export const resetPasswordApi = (data) => {
	return fetch(`${BASE_URL}password-reset`, {
		method: 'POST',
		headers: setHeadersWithContentType,
		body: JSON.stringify({ email: data }),
	}).then((res) => checkResponse(res));
};
