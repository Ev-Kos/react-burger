import { useState } from 'react';
import styles from '../pages.module.css';
import { Form } from '@/components/form/form';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormLink } from '@/components/form-link/form-link';
import { ROUTEPATHS } from '@/utils/routes';

export const ForgotPassword = () => {
	const [value, setValue] = useState('');

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<main className={`${styles.page} ${styles.page_margin_lg}`}>
			<Form
				title='Восстановление пароля'
				formFields={[
					<Input
						type='email'
						name='email'
						value={value}
						onChange={handleChange}
						placeholder='Укажите E-mail'
					/>,
					<Button htmlType='submit' type='primary' size='medium'>
						Восстановить
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
