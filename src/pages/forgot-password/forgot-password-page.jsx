import { useEffect, useState } from 'react';
import styles from '../pages.module.css';
import { Form } from '@/components/form/form';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormLink } from '@/components/form-link/form-link';
import { ROUTEPATHS } from '@/utils/routes';
import { validateEmail } from '@/utils/validate';
import { resetPasswordApi } from '@/utils/api/reset-password';
import { useNavigate } from 'react-router';

export const ForgotPassword = () => {
	const [value, setValue] = useState('');
	const [error, setError] = useState('');
	const [isTouched, setIsTouched] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (isTouched) {
			const validationResult = validateEmail(value);
			setError(validationResult || '');
			setIsValid(!validationResult);
		}
	}, [value, isTouched]);

	const handleChange = (e) => {
		setValue(e.target.value);
		if (!isTouched && e.target.value) {
			setIsTouched(true);
		}
	};

	const handleBlur = (e) => {
		if (!isTouched) setIsTouched(true);
		const validationError = validateEmail(e.target.value);
		setError(validationError || '');
		setIsValid(!validationError);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isTouched) setIsTouched(true);

		const validationError = validateEmail(value);
		if (validationError) {
			setError(validationError);
			setIsValid(false);
			return;
		}

		try {
			setIsLoading(true);
			await resetPasswordApi(value);
			navigate(ROUTEPATHS.resetPass, {
				state: { fromForgotPassword: true },
			});
		} catch (e) {
			setError('Ошибка, попробуйте еще раз или перезагрузите страницу');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className={`${styles.page} ${styles.page_margin_lg}`}>
			<Form
				title='Восстановление пароля'
				onSubmit={handleSubmit}
				formFields={[
					<Input
						type='email'
						name='email'
						value={value}
						onChange={handleChange}
						placeholder='Укажите E-mail'
						onBlur={handleBlur}
						error={Boolean(error)}
						errorText={error}
					/>,
					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						disabled={!isValid}>
						{isLoading ? 'Отправка...' : 'Восстановить'}
					</Button>,
				]}
				linkBlocks={[
					<FormLink
						text='Вспомнили пароль?'
						link={ROUTEPATHS.login}
						textLink='Войти'
					/>,
				]}
			/>
		</main>
	);
};
