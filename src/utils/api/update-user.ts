import { checkResponse, setHeadersWithAuth } from '.';
import { BASE_URL } from '../constants';
import { TGetUserResponse, TUserData } from '../types';

export const updateUserApi = (data: Partial<TUserData>) => {
	return fetch(`${BASE_URL}auth/user`, {
		method: 'PATCH',
		headers: setHeadersWithAuth(),
		body: JSON.stringify(data),
	}).then((res) => checkResponse<TGetUserResponse>(res));
};
