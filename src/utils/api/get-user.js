import { checkResponse, setHeadersWithAuth } from '.';
import { BASE_URL } from '../constants';

export const getUserApi = () => {
	return fetch(`${BASE_URL}auth/user`, {
		headers: setHeadersWithAuth(),
	}).then((res) => checkResponse(res));
};
