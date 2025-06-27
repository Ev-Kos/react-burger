import { checkResponse, setHeadersWithContentType } from '.';
import { BASE_URL } from '../constants';
import { TInfoResponse } from '../types';

export const changePassword = (newPassword: string, resetToken: string) => {
	return fetch(`${BASE_URL}password-reset/reset`, {
		method: 'POST',
		headers: setHeadersWithContentType,
		body: JSON.stringify({ password: newPassword, token: resetToken }),
	}).then((res) => checkResponse<TInfoResponse>(res));
};
