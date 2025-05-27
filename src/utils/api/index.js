export const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
};

export const setHeadersWithContentType = { 'Content-Type': 'application/json' };
