import { useParams } from 'react-router';
import styles from './feed-detail.module.css';
import stylesPage from '../pages.module.css';
import { useSelector } from 'react-redux';
import { ingredientsSelectors } from '@/services/selectors/ingredientsSelector';
import { wsSelectors } from '@/services/selectors/wsSelector';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from '@/services/store';
import { INGREDIENT_TYPES, ORDER_STATUS, WS_URL } from '@/utils/constants';
import { TIngredient, WsStatus } from '@/utils/types';
import { connect, disconnect } from '@/services/actions/wsActions';
import { Loader } from '@/components/loader/loader';
import { TooltipText } from '@/components/tooltip-text/tooltip-text';

type TIngredientWithCount = {
	count: number;
} & TIngredient;

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

	console.log(price);

	return (
		<>
			{!feed && !order ? (
				<Loader />
			) : (
				<main className={`${stylesPage.page} ${stylesPage.page_margin_base}`}>
					<div className={styles.container}>
						<p
							className={`${styles.number} text text_type_digits-default mb-10`}>{`#${order?.number}`}</p>
						<TooltipText
							text={String(order?.name)}
							className='text text_type_main-medium mb-3'
						/>
						<p
							className={`${orderStatus.class} text text_type_main-default mb-15`}>
							{orderStatus.text}
						</p>
						<p className='text text_type_main-medium mb-6'>Состав:</p>
						<ul></ul>
					</div>
				</main>
			)}
		</>
	);
};
