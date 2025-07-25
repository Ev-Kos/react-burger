import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from 'react';
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
import { ErrorMessage } from '@/components/error-message/error-message';

type FormField = 'code' | 'password';

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
	const [errorApi, setErrorApi] = useState('');
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

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
		if (errors[name as FormField]) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}
	};

	const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
		const { name } = e.target;

		if (!touched[name as FormField]) {
			setTouched((prev) => ({ ...prev, [name]: true }));
		}
		const error = validateEmptyField(form[name as FormField]);
		setErrors((prev) => ({ ...prev, [name]: error }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
			setErrorApi('');
			setIsLoading(true);
			await changePassword(form.password, form.code);
			navigate(ROUTEPATHS.login);
		} catch (e) {
			setErrorApi('Ошибка, возможно введен неверный код');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className={`${styles.page} ${styles.page_margin_lg}`}>
			<Form
				title='Восстановление пароля'
				onSubmit={handleSubmit}
				error={errorApi}
				formFields={[
					<div className={styles.input}>
						<PasswordInput
							name='password'
							value={form.password}
							onChange={handleChange}
							placeholder='Введите новый пароль'
							onBlur={handleBlur}
							extraClass={errors.password ? styles.input_error : undefined}
						/>
						{Boolean(errors.password) && (
							<ErrorMessage text={errors.password} isInput />
						)}
					</div>,
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
						{isLoading ? 'Отправка' : 'Сохранить'}
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
