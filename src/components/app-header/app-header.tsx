import styles from './app-header.module.css';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { userSelector } from '@/services/selectors/userSelector';
import { Link, NavLink, useLocation } from 'react-router';
import { ROUTEPATHS } from '@/utils/routes';
import { useAppSelector } from '@/services/store';

export const AppHeader = () => {
	const user = useAppSelector(userSelector.user);
	const { pathname } = useLocation();

	return (
		<header className={styles.header}>
			<nav className={`${styles.menu} p-4`}>
				<div className={styles.menu_part_left}>
					<NavLink
						to={ROUTEPATHS.home}
						className={({ isActive }) =>
							isActive ? `${styles.link} ${styles.link_active}` : styles.link
						}>
						<BurgerIcon
							type={pathname === ROUTEPATHS.home ? 'primary' : 'secondary'}
						/>
						<p className='text text_type_main-default ml-2'>Конструктор</p>
					</NavLink>
					<NavLink
						to={ROUTEPATHS.feed}
						className={({ isActive }) =>
							isActive
								? `${styles.link} ${styles.link_active} ml-10`
								: `${styles.link} ml-10`
						}>
						<ListIcon
							type={pathname === ROUTEPATHS.feed ? 'primary' : 'secondary'}
						/>
						<p className='text text_type_main-default ml-2'>Лента заказов</p>
					</NavLink>
				</div>
				<Link className={styles.logo} to={ROUTEPATHS.home}>
					<Logo />
				</Link>
				<NavLink
					to={ROUTEPATHS.profile}
					className={({ isActive }) =>
						isActive
							? `${styles.link} ${styles.link_active} ${styles.link_position_last}`
							: `${styles.link} ${styles.link_position_last}`
					}>
					<ProfileIcon
						type={
							pathname.startsWith(ROUTEPATHS.profile) ? 'primary' : 'secondary'
						}
					/>
					<p className='text text_type_main-default ml-2'>
						{user?.name
							? user?.name
							: user?.email
								? user.email
								: 'Личный кабинет'}
					</p>
				</NavLink>
			</nav>
		</header>
	);
};
