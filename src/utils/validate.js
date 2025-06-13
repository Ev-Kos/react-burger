export const validateEmail = (email) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!email.trim()) {
		return 'Email обязателен для заполнения';
	}
	if (!regex.test(email)) {
		return 'Введите корректный email';
	}
	return null;
};

export const validateEmptyField = (value) => {
	if (!value.trim()) {
		return 'Поле обязательно для заполнения';
	}
	return '';
};
