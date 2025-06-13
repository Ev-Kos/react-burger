import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../pages.module.css';
import { useEffect, useState } from 'react';
import { ROUTEPATHS } from '@/utils/routes';
import { Form } from '@/components/form/form';
import { FormLink } from '@/components/form-link/form-link';
import { validateEmail, validateEmptyField } from '@/utils/validate';
import { fetchLogin, loginSliceState } from '@/services/slices/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

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
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { request, failed } = useSelector(loginSliceState);

	useEffect(() => {
		const emailError = validateEmail(form.email);
		const passwordError = validateEmptyField(form.password);

		setErrors({
			email: touched.email ? emailError : '',
			password: touched.password ? passwordError : '',
		});

		setIsValid(!emailError && !passwordError);
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
	};

	const handleSubmit = async (e) => {
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
			await dispatch(fetchLogin(form)).unwrap();
			navigate(ROUTEPATHS.home);
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
					<PasswordInput
						name='password'
						value={form.password}
						onChange={handleChange}
						onBlur={handleBlur}
						error={Boolean(errors.password)}
						errorText={errors.password}
					/>,
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
