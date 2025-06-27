import { checkResponse, setHeadersWithAuth } from '.';
import { BASE_URL } from '../constants';
import { TGetUserResponse } from '../types';

export const getUserApi = () => {
	return fetch(`${BASE_URL}auth/user`, {
		headers: setHeadersWithAuth(),
	}).then((res) => checkResponse<TGetUserResponse>(res));
};
