import { NavLink } from 'react-router';
import styles from '../pages.module.css';
import profileStyles from './profile-page.module.css';
import { ROUTEPATHS } from '@/utils/routes';
import { Form } from '@/components/form/form';
import {
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { logoutApi } from '@/utils/api/logout';

const baseLinkClass = `text text_type_main-medium ${profileStyles.link}`;

export const ProfilePage = () => {
	const logout = async () => {
		try {
			await logoutApi(localStorage.getItem('refreshToken'));
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('accessToken');
		} catch (e) {
			console.error(`Ошибка: ${e}`);
		}
	};

	return (
		<main className={`${styles.page_profile} ${styles.page_margin_base}`}>
			<nav className={profileStyles.nav_container}>
				<ul className={profileStyles.nav_list}>
					<li className={profileStyles.link_wrap}>
						<NavLink
							to={ROUTEPATHS.profile}
							className={({ isActive }) =>
								isActive
									? `${baseLinkClass} ${profileStyles.link_active}`
									: baseLinkClass
							}>
							Профиль
						</NavLink>
					</li>
					<li className={profileStyles.link_wrap}>
						<NavLink
							to='/profile/orders'
							className={({ isActive }) =>
								isActive
									? `${baseLinkClass} ${profileStyles.link_active}`
									: baseLinkClass
							}>
							История заказов
						</NavLink>
					</li>
					<button
						className={`${baseLinkClass} ${profileStyles.link_wrap}`}
						onClick={logout}>
						Выход
					</button>
				</ul>
				<p className='text text_type_main-small text_color_inactive'>
					В этом разделе вы можете <br /> изменить свои персональные данные
				</p>
			</nav>
			<Form
				formFields={[
					<Input
						type='text'
						name='name'
						value='Mark'
						onChange={() => console.log('')}
						placeholder='Имя'
						icon='EditIcon'
					/>,
					<EmailInput
						name='email'
						onChange={() => console.log('')}
						value='fffffffffffff'
						isIcon={true}
					/>,
					<PasswordInput
						name='password'
						onChange={() => console.log('')}
						value='ggggggggggg'
						icon='EditIcon'
					/>,
				]}
			/>
		</main>
	);
};
