import { checkResponse, setHeadersWithContentType } from '.';
import { BASE_URL } from '../constants';
import { TInfoResponse } from '../types';

export const logoutApi = (token: string) => {
	return fetch(`${BASE_URL}auth/logout`, {
		method: 'POST',
		headers: setHeadersWithContentType,
		body: JSON.stringify({
			token: token,
		}),
	}).then((res) => checkResponse<TInfoResponse>(res));
};
