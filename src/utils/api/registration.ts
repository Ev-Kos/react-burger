import { checkResponse, setHeadersWithContentType } from '.';
import { BASE_URL } from '../constants';
import { TLoginResponse, TUserData } from '../types';

export const registrationApi = (data: TUserData) => {
	return fetch(`${BASE_URL}auth/register`, {
		method: 'POST',
		headers: setHeadersWithContentType,
		body: JSON.stringify(data),
	}).then((res) => checkResponse<TLoginResponse>(res));
};
