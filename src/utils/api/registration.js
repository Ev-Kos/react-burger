import { checkResponse, setHeadersWithContentType } from '.';
import { BASE_URL } from '../constants';

export const registrationApi = (data) => {
	return fetch(`${BASE_URL}auth/register`, {
		method: 'POST',
		headers: setHeadersWithContentType,
		body: JSON.stringify(data),
	}).then((res) => checkResponse(res));
};
