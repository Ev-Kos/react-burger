export const validateEmail = (email: string) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!email.trim()) {
		return 'Email обязателен для заполнения';
	}
	if (!regex.test(email)) {
		return 'Введите корректный email';
	}
	return '';
};

export const validateEmptyField = (value: string) => {
	if (!value.trim()) {
		return 'Поле обязательно для заполнения';
	}
	return '';
};
