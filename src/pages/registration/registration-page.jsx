import { Form } from '@/components/form/form';
import styles from '../pages.module.css';
import { useState } from 'react';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormLink } from '@/components/form-link/form-link';
import { ROUTEPATHS } from '@/utils/routes';

export const RegistrationPage = () => {
	const [form, setForm] = useState({
		name: '',
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
				title='Регистрация'
				formFields={[
					<Input
						type='text'
						name='name'
						value={form.name}
						onChange={handleChange}
						placeholder='Имя'
					/>,
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
						Зарегистрироваться
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
