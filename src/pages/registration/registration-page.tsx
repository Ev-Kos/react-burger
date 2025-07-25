import { Form } from '@/components/form/form';
import styles from '../pages.module.css';
import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from 'react';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormLink } from '@/components/form-link/form-link';
import { ROUTEPATHS } from '@/utils/routes';
import { validateEmail, validateEmptyField } from '@/utils/validate';
import {
	fetchRegistrUser,
	registrationSliceState,
} from '@/services/slices/registrationSlice';
import { useNavigate } from 'react-router';
import { setUser } from '@/services/slices/userSlice';
import { FormField } from '@/utils/types';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { ErrorMessage } from '@/components/error-message/error-message';

export const RegistrationPage = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [touched, setTouched] = useState({
		name: false,
		email: false,
		password: false,
	});

	const [isValid, setIsValid] = useState(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { request, error } = useAppSelector(registrationSliceState);

	useEffect(() => {
		const nameError = validateEmptyField(form.name);
		const emailError = validateEmail(form.email);
		const passwordError = validateEmptyField(form.password);

		setErrors({
			name: touched.name ? nameError : '',
			email: touched.email ? emailError : '',
			password: touched.password ? passwordError : '',
		});

		setIsValid(!nameError && !emailError && !passwordError);
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

		setTouched({
			name: true,
			email: true,
			password: true,
		});

		const nameError = validateEmptyField(form.name);
		const emailError = validateEmail(form.email);
		const passwordError = validateEmptyField(form.password);

		if (nameError || emailError || passwordError) {
			setErrors({
				name: nameError,
				email: emailError,
				password: passwordError,
			});
			setIsValid(false);
			return;
		}
		try {
			const res = await dispatch(fetchRegistrUser(form)).unwrap();
			dispatch(setUser(res.user));
			navigate(ROUTEPATHS.home);
		} catch (e) {
			console.error(`Ошибка fetchRegistrUser: ${e}`);
		}
	};

	return (
		<main className={`${styles.page} ${styles.page_margin_lg}`}>
			<Form
				title='Регистрация'
				onSubmit={handleSubmit}
				error={error?.message}
				formFields={[
					<Input
						type='text'
						name='name'
						value={form.name}
						onChange={handleChange}
						placeholder='Имя'
						onBlur={handleBlur}
						error={Boolean(errors.name)}
						errorText={errors.name}
					/>,
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
						{request ? 'Отправка' : 'Зарегистрироваться'}
					</Button>,
				]}
				linkBlocks={[
					<FormLink
						text='Уже зарегистрированы?'
						link={ROUTEPATHS.login}
						textLink='Войти'
					/>,
				]}
			/>
		</main>
	);
};
