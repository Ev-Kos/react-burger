import { useState } from 'react';
import styles from '../pages.module.css';
import { Form } from '@/components/form/form';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormLink } from '@/components/form-link/form-link';
import { ROUTEPATHS } from '@/utils/routes';

export const ResetPassword = () => {
	const [form, setForm] = useState({
		password: '',
		code: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	return (
		<main className={styles.page}>
			<Form
				title='Восстановление пароля'
				formFields={[
					<PasswordInput
						name='password'
						value={form.password}
						onChange={handleChange}
						placeholder='Введите новый пароль'
					/>,
					<Input
						type='text'
						name='code'
						value={form.code}
						onChange={handleChange}
						placeholder='Введите код из письма'
					/>,
					<Button htmlType='submit' type='primary' size='medium'>
						Сохранить
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
