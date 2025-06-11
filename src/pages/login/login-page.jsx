import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';
import { useState } from 'react';
import { Link } from 'react-router';
import { ROUTEPATHS } from '@/utils/routes';

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
		<main className={styles.login}>
			<div className={styles.content}>
				<form className={styles.form}>
					<h1 className='text text_type_main-medium'>Вход</h1>
					<Input
						type='email'
						name='email'
						value={form.email}
						onChange={handleChange}
						placeholder='E-mail'
					/>
					<PasswordInput
						name='password'
						value={form.password}
						onChange={handleChange}
					/>
					<Button htmlType='submit' type='primary' size='medium'>
						Войти
					</Button>
				</form>
				<div className={styles.links}>
					<p className='text text_type_main-small text_color_inactive'>
						Вы &mdash; новый пользователь?
						<Link to={ROUTEPATHS.registr} className={`${styles.link} ml-2`}>
							Зарегистрироваться
						</Link>
					</p>
					<p className='text text_type_main-small text_color_inactive'>
						Забыли пароль?
						<Link to={ROUTEPATHS.forgotPass} className={`${styles.link} ml-2`}>
							Восстановить пароль
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
};
