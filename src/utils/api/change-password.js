import { checkResponse, setHeadersWithContentType } from '.';
import { BASE_URL } from '../constants';

export const changePassword = (newPassword, resetToken) => {
	return fetch(`${BASE_URL}password-reset/reset`, {
		method: 'POST',
		headers: setHeadersWithContentType,
		body: JSON.stringify({ password: newPassword, token: resetToken }),
	}).then((res) => checkResponse(res));
};
