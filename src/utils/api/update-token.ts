import { checkResponse, setHeadersWithContentType } from '.';
import { BASE_URL } from '../constants';
import { TLoginResponse } from '../types';

export const updateToken = () => {
	return fetch(`${BASE_URL}auth/token`, {
		method: 'POST',
		headers: setHeadersWithContentType,
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then((res) => checkResponse<TLoginResponse>(res))
		.then((data) => {
			if (!data.success) {
				return Promise.reject(data);
			}
			localStorage.setItem('refreshToken', data.refreshToken);
			localStorage.setItem('accessToken', data.accessToken);
			return data;
		});
};
