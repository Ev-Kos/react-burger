import { useEffect, useState } from 'react';
import styles from '../pages.module.css';
import { Form } from '@/components/form/form';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormLink } from '@/components/form-link/form-link';
import { ROUTEPATHS } from '@/utils/routes';
import { validateEmptyField } from '@/utils/validate';
import { changePassword } from '@/utils/api/change-password';
import { useNavigate } from 'react-router';

export const ResetPassword = () => {
	const [form, setForm] = useState({
		password: '',
		code: '',
	});

	const [errors, setErrors] = useState({
		password: '',
		code: '',
	});

	const [touched, setTouched] = useState({
		password: false,
		code: false,
	});

	const [isValid, setIsValid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const passwordError = validateEmptyField(form.password);
		const codeError = validateEmptyField(form.code);

		setErrors({
			password: touched.password ? passwordError : '',
			code: touched.code ? codeError : '',
		});

		setIsValid(!passwordError && !codeError);
	}, [form, touched]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}
	};

	const handleBlur = (e) => {
		const { name } = e.target;

		if (!touched[name]) {
			setTouched((prev) => ({ ...prev, [name]: true }));
		}
		const error = validateEmptyField(form[name]);
		setErrors((prev) => ({ ...prev, [name]: error }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setTouched({ password: true, code: true });

		const passwordError = validateEmptyField(form.password);
		const codeError = validateEmptyField(form.code);

		if (passwordError || codeError) {
			setErrors({
				password: passwordError,
				code: codeError,
			});
			setIsValid(false);
			return;
		}

		try {
			setIsLoading(true);
			await changePassword(form.password, form.code);
			navigate(ROUTEPATHS.login);
		} catch (e) {
			setErrors({
				password: '',
				code: 'Ошибка, возможно введен неверный код',
			});
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
					<PasswordInput
						name='password'
						value={form.password}
						onChange={handleChange}
						placeholder='Введите новый пароль'
						onBlur={handleBlur}
						error={Boolean(errors.password)}
						errorText={errors.password}
					/>,
					<Input
						type='text'
						name='code'
						value={form.code}
						onChange={handleChange}
						placeholder='Введите код из письма'
						onBlur={handleBlur}
						error={Boolean(errors.code)}
						errorText={errors.code}
					/>,
					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						disabled={!isValid}>
						{isLoading ? 'Отправка...' : 'Сохранить'}
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
