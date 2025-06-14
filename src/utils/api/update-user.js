import { checkResponse, setHeadersWithAuth } from '.';
import { BASE_URL } from '../constants';

export const updateUserApi = (data) => {
	return fetch(`${BASE_URL}auth/user`, {
		method: 'PATCH',
		headers: setHeadersWithAuth,
		body: JSON.stringify(data),
	}).then((res) => checkResponse(res));
};
