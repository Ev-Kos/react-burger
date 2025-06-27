import { checkResponse, setHeadersWithContentType } from '.';
import { BASE_URL } from '../constants';
import { TInfoResponse } from '../types';

export const resetPasswordApi = (data: string) => {
	return fetch(`${BASE_URL}password-reset`, {
		method: 'POST',
		headers: setHeadersWithContentType,
		body: JSON.stringify({ email: data }),
	}).then((res) => checkResponse<TInfoResponse>(res));
};
