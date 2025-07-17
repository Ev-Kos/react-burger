import { useParams } from 'react-router';
import styles from './feed-detail.module.css';
import stylesPage from '../pages.module.css';
import { useSelector } from 'react-redux';
import { ingredientsSelectors } from '@/services/selectors/ingredientsSelector';
import { wsSelectors } from '@/services/selectors/wsSelector';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from '@/services/store';
import { INGREDIENT_TYPES, ORDER_STATUS, WS_URL } from '@/utils/constants';
import { TIngredientWithCount, WsStatus } from '@/utils/types';
import { connect, disconnect } from '@/services/actions/wsActions';
import { Loader } from '@/components/loader/loader';
import { FeedDetailItem } from '@/components/feed-detail-item/feed-detail-item';
import { parseTime } from '@/utils/parse-time';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const FeedDetail = () => {
	const { id } = useParams();

	const dispatch = useAppDispatch();
	const ingredients = useSelector(ingredientsSelectors.getIngredients);
	const feed = useSelector(wsSelectors.getOrders);
	const status = useSelector(wsSelectors.getWsStatus);

	const order = useMemo(
		() => (feed ? feed.orders.find((item) => item._id === id) : null),
		[feed]
	);

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
				ingredient.type === INGREDIENT_TYPES.BUN
					? (res = [
							...res,
							{ ...ingredient, count: 2, price: 2 * ingredient.price },
						])
					: (res = [
							...res,
							{
								...ingredient,
								count: map[key],
								price: map[key] * ingredient.price,
							},
						]);
			}
		}
		return res;
	}, [order, ingredients]);

	const price = useMemo(() => {
		return ingrediensOfOrder.reduce((acc, cur) => acc + cur.price, 0);
	}, [ingrediensOfOrder]);

	useEffect(() => {
		if (!feed) {
			dispatch(connect(`${WS_URL}/all`));
		}
		return () => {
			if (status !== WsStatus.OFFLINE) {
				dispatch(disconnect());
			}
		};
	}, []);

	return (
		<>
			{!feed && !order ? (
				<Loader />
			) : (
				<main className={`${stylesPage.page} ${stylesPage.page_margin_base}`}>
					<div className={styles.container}>
						<p
							className={`${styles.number} text text_type_digits-default mb-10`}>{`#${order?.number}`}</p>
						<p className='text text_type_main-medium mb-3'>{order?.name}</p>
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
							<div className={styles.price_wrap}>
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
