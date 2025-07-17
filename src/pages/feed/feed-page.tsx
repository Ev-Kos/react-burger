import { Feed } from '@/components/feed/feed';
import styles from '../pages.module.css';
import stylesFeedPage from './feed-page.module.css';
import { useAppDispatch } from '@/services/store';
import { useEffect } from 'react';
import { WS_URL } from '@/utils/constants';
import { useSelector } from 'react-redux';
import { InfoMessage } from '@/components/info-message/info-message';
import { Loader } from '@/components/loader/loader';
import { FeedInfo } from '@/components/feed-info/feed-info';
import { WsStatus } from '@/utils/types';
import {
	allOrdersConnect,
	allOrdersDisconnect,
} from '@/services/slices/allOrdersWsSlice';
import { alOrdersWsSelectors } from '@/services/selectors/allOrdersWsSelector';

export const FeedPage = () => {
	const dispatch = useAppDispatch();
	const feed = useSelector(alOrdersWsSelectors.getOrders);
	const status = useSelector(alOrdersWsSelectors.getWsStatus);

	useEffect(() => {
		if (!feed) {
			dispatch(allOrdersConnect(`${WS_URL}/all`));
		}

		return () => {
			if (status !== WsStatus.OFFLINE) {
				dispatch(allOrdersDisconnect());
			}
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
						<div className={stylesFeedPage.feed_info}>
							<FeedInfo />
						</div>
					</div>
				</main>
			)}
		</>
	);
};
