import { TIngredient, TOrder } from '@/utils/types';
import styles from './feed-item.module.css';
import { useMemo } from 'react';
import { ingredientsSelectors } from '@/services/selectors/ingredientsSelector';
import { TooltipText } from '../tooltip-text/tooltip-text';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { parseTime } from '@/utils/parse-time';
import { FeedImage } from '../feed-image/feed-image';
import { Link, useLocation } from 'react-router';
import { ROUTEPATHS } from '@/utils/routes';
import { ORDER_STATUS } from '@/utils/constants';
import { useAppSelector } from '@/services/store';

type TFeedItemProps = {
	item: TOrder;
};

export const FeedItem = ({ item }: TFeedItemProps) => {
	const location = useLocation();
	const ingredients = useAppSelector(ingredientsSelectors.getIngredients);

	const ingrediensOfOrder = useMemo(() => {
		let res: TIngredient[] = [];
		item.ingredients.forEach((el) => {
			const ingredient = ingredients.find((i) => i._id === el);
			if (ingredient) {
				res = [...res, ingredient];
			}
		});
		return res;
	}, [item, ingredients]);

	const images = useMemo(() => {
		return ingrediensOfOrder
			.map((el) => el.image_mobile)
			.slice(0, 6)
			.reverse();
	}, [ingrediensOfOrder]);

	const price = useMemo(() => {
		return ingrediensOfOrder.reduce((acc, cur) => acc + cur.price, 0);
	}, [ingrediensOfOrder]);

	const isProfile = location.pathname.includes(ROUTEPATHS.profile);

	const url = useMemo(
		() =>
			isProfile
				? `${ROUTEPATHS.profileOrders}/${item._id}`
				: `${ROUTEPATHS.feed}/${item._id}`,
		[location.pathname]
	);

	const orderStatus = useMemo(
		() =>
			item.status === ORDER_STATUS.DONE
				? { text: 'Выполнен', class: `${styles.done}` }
				: item && item.status === ORDER_STATUS.CREATED
					? { text: 'Создан', class: '' }
					: { text: 'Готовится', class: '' },
		[item]
	);

	return (
		<li className={styles.item}>
			<Link
				className={styles.item_link}
				to={url}
				state={{ background: location }}>
				<div className={styles.item_order_info}>
					<p
						className={`${styles.item_order_number} text text_type_digits-medium`}>
						{`#${item.number}`}
					</p>
					<p
						className={`${styles.item_order_time} text text_type_main-default text_color_inactive`}>
						{parseTime(item.createdAt)}
					</p>
				</div>
				<div className={styles.item_name_status}>
					<div className={styles.item_name}>
						<TooltipText
							text={item.name}
							className={`text text_type_main-medium ${isProfile && 'mb-2'}`}
						/>
					</div>
					{isProfile && (
						<p className={`${orderStatus.class} text text_type_main-default`}>
							{orderStatus.text}
						</p>
					)}
				</div>

				<div className={styles.images_and_price}>
					<ul className={styles.images}>
						{images.map((item, index) => (
							<FeedImage
								image={item}
								length={ingrediensOfOrder.length}
								index={index}
								key={index}
							/>
						))}
					</ul>
					<div className={styles.price}>
						<span className='text text_type_digits-default'>{price}</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</Link>
		</li>
	);
};
