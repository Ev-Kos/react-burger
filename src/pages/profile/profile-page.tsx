import { NavLink, useLocation, useNavigate } from 'react-router';
import styles from './profile-page.module.css';
import { ROUTEPATHS } from '@/utils/routes';
import { logoutApi } from '@/utils/api/logout';
import { setUser } from '@/services/slices/userSlice';
import { useAppDispatch } from '@/services/store';
import { ProfileForm } from '@/components/profile-form/profile-form';
import { Feed } from '@/components/feed/feed';
import { useEffect, useMemo } from 'react';
import {
	historyOrdersConnect,
	historyOrdersDisconnect,
} from '@/services/slices/historyOrdersSlice';
import { WS_URL } from '@/utils/constants';
import { WsStatus } from '@/utils/types';
import { useSelector } from 'react-redux';
import { historyOrdersWsSelectors } from '@/services/selectors/historyOrderWsSelector';
import { InfoMessage } from '@/components/info-message/info-message';

const baseLinkClass = `text text_type_main-medium ${styles.link}`;

export const ProfilePage = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const accessToken = localStorage.getItem('accessToken')?.slice(7);
	const feed = useSelector(historyOrdersWsSelectors.getOrders);
	const status = useSelector(historyOrdersWsSelectors.getWsStatus);

	const orders = useMemo(
		() => (feed && feed.orders ? [...feed.orders].reverse() : null),
		[feed]
	);

	const logout = async () => {
		try {
			await logoutApi(String(localStorage.getItem('refreshToken')));
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('accessToken');
			navigate(ROUTEPATHS.login);
			dispatch(setUser(null));
		} catch (e) {
			console.error(`Ошибка: ${e}`);
		}
	};

	useEffect(() => {
		if (!feed) {
			dispatch(historyOrdersConnect(`${WS_URL}?token=${accessToken}`));
		}

		return () => {
			if (status !== WsStatus.OFFLINE) {
				dispatch(historyOrdersDisconnect());
			}
		};
	}, []);

	return (
		<main className={styles.page_profile}>
			<nav className={styles.nav_container}>
				<ul className={styles.nav_list}>
					<li className={styles.link_wrap}>
						<NavLink
							to={ROUTEPATHS.profile}
							end
							className={({ isActive }) =>
								isActive
									? `${baseLinkClass} ${styles.link_active}`
									: baseLinkClass
							}>
							Профиль
						</NavLink>
					</li>
					<li className={styles.link_wrap}>
						<NavLink
							to={ROUTEPATHS.profileOrders}
							className={({ isActive }) =>
								isActive
									? `${baseLinkClass} ${styles.link_active}`
									: baseLinkClass
							}>
							История заказов
						</NavLink>
					</li>
					<button
						className={`${baseLinkClass} ${styles.link_wrap}`}
						onClick={logout}>
						Выход
					</button>
				</ul>
				<p className='text text_type_main-small text_color_inactive'>
					{pathname === ROUTEPATHS.profile ? (
						<>
							В этом разделе вы можете
							<br />
							изменить свои персональные данные
						</>
					) : (
						<>
							В этом разделе вы можете
							<br />
							просмотреть свою историю заказов
						</>
					)}
				</p>
			</nav>
			{pathname === ROUTEPATHS.profile && (
				<div className={styles.form}>
					<ProfileForm />
				</div>
			)}
			{pathname === ROUTEPATHS.profileOrders && (
				<>
					{feed && orders && orders.length !== 0 ? (
						<div className={styles.orders}>
							<Feed orders={orders} />
						</div>
					) : (
						<>
							{status === WsStatus.OFFLINE && (
								<div className={styles.orders_empty}>
									<InfoMessage text='Пока нет созданных заказов' />
								</div>
							)}
						</>
					)}
				</>
			)}
		</main>
	);
};
