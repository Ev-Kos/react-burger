import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../pages.module.css';
import { ChangeEvent, FocusEvent, FormEvent, useMemo, useState } from 'react';
import { ROUTEPATHS } from '@/utils/routes';
import { Form } from '@/components/form/form';
import { FormLink } from '@/components/form-link/form-link';
import { validateEmail, validateEmptyField } from '@/utils/validate';
import { fetchLogin, loginSliceState } from '@/services/slices/loginSlice';
import { useLocation, useNavigate } from 'react-router';
import { setUser } from '@/services/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { ErrorMessage } from '@/components/error-message/error-message';

type FormField = 'email' | 'password';

export const LoginPage = () => {
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});

	const [touched, setTouched] = useState({
		email: false,
		password: false,
	});

	const [isValid, setIsValid] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { request, failed } = useAppSelector(loginSliceState);

	useMemo(() => {
		const emailError = validateEmail(form.email);
		const passwordError = validateEmptyField(form.password);
		setErrors({
			email: touched.email ? emailError : '',
			password: touched.password ? passwordError : '',
		});

		setIsValid(!emailError && !passwordError);
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
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setTouched({ email: true, password: true });

		const emailError = validateEmail(form.email);
		const passwordError = validateEmptyField(form.password);

		if (emailError || passwordError) {
			setErrors({
				email: emailError,
				password: passwordError,
			});
			setIsValid(false);
			return;
		}
		try {
			const res = await dispatch(fetchLogin(form)).unwrap();
			dispatch(setUser(res.user));
			navigate(location.state?.from?.pathname || ROUTEPATHS.home, {
				replace: true,
			});
		} catch (e) {
			console.error(`Ошибка fetchLogin: ${e}`);
		}
	};

	return (
		<main className={`${styles.page} ${styles.page_margin_lg}`}>
			<Form
				title='Вход'
				onSubmit={handleSubmit}
				error={failed ? 'Произошла ошибка' : ''}
				formFields={[
					<Input
						type='email'
						name='email'
						value={form.email}
						onChange={handleChange}
						placeholder='E-mail'
						onBlur={handleBlur}
						error={Boolean(errors.email)}
						errorText={errors.email}
					/>,
					<div className={styles.input}>
						<PasswordInput
							name='password'
							value={form.password}
							onChange={handleChange}
							onBlur={handleBlur}
							extraClass={errors.password ? styles.input_error : undefined}
						/>
						{Boolean(errors.password) && (
							<ErrorMessage text={errors.password} isInput />
						)}
					</div>,
					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						disabled={!isValid}>
						{request ? 'Отправляется' : 'Войти'}
					</Button>,
				]}
				linkBlocks={[
					<FormLink
						text='Вы &mdash; новый пользователь?'
						link={ROUTEPATHS.registr}
						textLink='Зарегистрироваться'
					/>,
					<FormLink
						text='Забыли пароль?'
						link={ROUTEPATHS.forgotPass}
						textLink='Восстановить пароль'
					/>,
				]}
			/>
		</main>
	);
};
