export const checkResponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const setHeadersWithContentType = { 'Content-Type': 'application/json' };
export const setHeadersWithAuth = {
	'Content-Type': 'application/json',
	Authorization: localStorage.getItem('accessToken'),
};
