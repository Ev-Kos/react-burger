export const checkResponse = <T>(res: Response): Promise<T> => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const setHeadersWithContentType = { 'Content-Type': 'application/json' };

export const setHeadersWithAuth = () => ({
	'Content-Type': 'application/json',
	Authorization: String(localStorage.getItem('accessToken')),
});
