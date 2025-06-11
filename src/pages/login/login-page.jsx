import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../pages.module.css';
import { useState } from 'react';
import { ROUTEPATHS } from '@/utils/routes';
import { Form } from '@/components/form/form';
import { FormLink } from '@/components/form-link/form-link';

export const LoginPage = () => {
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<main className={`${styles.page} ${styles.page_margin_lg}`}>
			<Form
				title='Вход'
				formFields={[
					<Input
						type='email'
						name='email'
						value={form.email}
						onChange={handleChange}
						placeholder='E-mail'
					/>,
					<PasswordInput
						name='password'
						value={form.password}
						onChange={handleChange}
					/>,
					<Button htmlType='submit' type='primary' size='medium'>
						Войти
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
