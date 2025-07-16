import { Feed } from '@/components/feed/feed';
import styles from '../pages.module.css';
import stylesFeedPage from './feed-page.module.css';
import { useAppDispatch } from '@/services/store';
import { useEffect } from 'react';
import { WS_URL } from '@/utils/constants';
import { connect, disconnect } from '@/services/actions/wsActions';
import { useSelector } from 'react-redux';
import { wsSelectors } from '@/services/selectors/wsSelector';
import { InfoMessage } from '@/components/info-message/info-message';
import { Loader } from '@/components/loader/loader';

export const FeedPage = () => {
	const dispatch = useAppDispatch();
	const feed = useSelector(wsSelectors.getOrders);

	useEffect(() => {
		dispatch(connect(`${WS_URL}/all`));

		return () => {
			dispatch(disconnect());
		};
	}, []);

	return (
		<>
			{!feed ? (
				<Loader />
			) : (
				<main className={`${styles.page} ${stylesFeedPage.feed_page}`}>
					<h1
						className={`${stylesFeedPage.title} text text_type_main-large mt-10 mb-5`}>
						Лента заказов
					</h1>
					<div className={stylesFeedPage.feed}>
						{feed.orders.length !== 0 ? (
							<div className={stylesFeedPage.orders}>
								<Feed orders={feed.orders} />
							</div>
						) : (
							<div className={stylesFeedPage.orders_empty}>
								<InfoMessage text='Пока нет созданных заказов' />
							</div>
						)}
						<div className={stylesFeedPage.feed_info}></div>
					</div>
				</main>
			)}
		</>
	);
};
