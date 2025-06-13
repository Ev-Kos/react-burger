export const checkResponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const setHeadersWithContentType = { 'Content-Type': 'application/json' };
