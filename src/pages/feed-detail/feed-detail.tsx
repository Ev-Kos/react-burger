import { useParams } from 'react-router';
import styles from './feed-detail.module.css';
import stylesPage from '../pages.module.css';
import { useSelector } from 'react-redux';
import { ingredientsSelectors } from '@/services/selectors/ingredientsSelector';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from '@/services/store';
import { ORDER_STATUS, WS_URL } from '@/utils/constants';
import { TIngredientWithCount, WsStatus } from '@/utils/types';
import { Loader } from '@/components/loader/loader';
import { FeedDetailItem } from '@/components/feed-detail-item/feed-detail-item';
import { parseTime } from '@/utils/parse-time';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { setOrderNumber } from '@/services/slices/feedDetailSlice';
import {
	allOrdersConnect,
	allOrdersDisconnect,
} from '@/services/slices/allOrdersWsSlice';
import { alOrdersWsSelectors } from '@/services/selectors/allOrdersWsSelector';

export const FeedDetail = ({ isModal }: { isModal?: boolean }) => {
	const { id } = useParams();

	const dispatch = useAppDispatch();
	const ingredients = useSelector(ingredientsSelectors.getIngredients);
	const feed = useSelector(alOrdersWsSelectors.getOrders);
	const status = useSelector(alOrdersWsSelectors.getWsStatus);

	const order = useMemo(() => {
		return feed ? feed.orders.find((item) => item._id === id) || null : null;
	}, [feed, id]);

	useEffect(() => {
		if (order) {
			dispatch(setOrderNumber(order.number));
		}
	}, [order, dispatch]);

	const orderStatus = useMemo(
		() =>
			order && order.status === ORDER_STATUS.DONE
				? { text: 'Выполнен', class: `${styles.done}` }
				: order && order.status === ORDER_STATUS.CREATED
					? { text: 'Создан', class: '' }
					: { text: 'Готовится', class: '' },
		[order]
	);

	const ingrediensOfOrder = useMemo(() => {
		let res: TIngredientWithCount[] = [];
		const map: Record<string, number> = {};
		order &&
			order.ingredients.forEach((el) => {
				if (el in map) {
					map[el] = map[el] + 1;
				} else {
					map[el] = 1;
				}
			});
		for (const key in map) {
			const ingredient = ingredients.find((item) => item._id === key);
			if (ingredient) {
				res = [
					...res,
					{
						...ingredient,
						count: map[key],
					},
				];
			}
		}
		return res;
	}, [order, ingredients]);

	const price = useMemo(() => {
		return ingrediensOfOrder.reduce(
			(acc, cur) => acc + cur.price * cur.count,
			0
		);
	}, [ingrediensOfOrder]);

	useEffect(() => {
		if (!feed && !isModal) {
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
			{!feed && !order ? (
				<div className={isModal ? styles.loader_modal : styles.loader}>
					<Loader />
				</div>
			) : (
				<main
					className={`${stylesPage.page} ${!isModal && stylesPage.page_margin_base}`}>
					<div className={styles.container}>
						{!isModal && (
							<p
								className={`${styles.number} text text_type_digits-default mb-10`}>{`#${order?.number}`}</p>
						)}
						<p
							className={`${isModal && 'mt-5'} text text_type_main-medium mb-3`}>
							{order?.name}
						</p>
						<p
							className={`${orderStatus.class} text text_type_main-default mb-15`}>
							{orderStatus.text}
						</p>
						<p className='text text_type_main-medium mb-6'>Состав:</p>
						<ul className={`${styles.list} custom-scroll`}>
							{ingrediensOfOrder.length !== 0 &&
								ingrediensOfOrder.map((item) => (
									<FeedDetailItem item={item} key={item._id} />
								))}
						</ul>
						<div className={styles.time_and_price}>
							<p className='text text_type_main-default text_color_inactive'>
								{parseTime(String(order?.createdAt))}
							</p>
							<div className={`${styles.price_wrap} pb-10`}>
								<p className='text text_type_digits-default'>{price}</p>
								<CurrencyIcon type='primary' />
							</div>
						</div>
					</div>
				</main>
			)}
		</>
	);
};
