import { checkResponse, setHeadersWithContentType } from '.';
import { BASE_URL } from '../constants';
import { TLoginData, TLoginResponse } from '../types';

export const loginApi = (data: TLoginData) => {
	return fetch(`${BASE_URL}auth/login`, {
		method: 'POST',
		headers: setHeadersWithContentType,
		body: JSON.stringify(data),
	}).then((res) => checkResponse<TLoginResponse>(res));
};
