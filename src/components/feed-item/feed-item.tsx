import { TIngredient, TOrder } from '@/utils/types';
import styles from './feed-item.module.css';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ingredientsSelectors } from '@/services/selectors/ingredientsSelector';
import { TooltipText } from '../tooltip-text/tooltip-text';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { parseTime } from '@/utils/parse-time';
import { FeedImage } from '../feed-image/feed-image';

type TFeedItemProps = {
	item: TOrder;
};

export const FeedItem = ({ item }: TFeedItemProps) => {
	const ingredients = useSelector(ingredientsSelectors.getIngredients);

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
		return ingrediensOfOrder.map((el) => el.image_mobile).slice(0, 6);
	}, [ingrediensOfOrder]);

	const price = useMemo(() => {
		return ingrediensOfOrder.reduce((acc, cur) => acc + cur.price, 0);
	}, [ingrediensOfOrder]);

	return (
		<div className={styles.item}>
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
			<div className={styles.item_name}>
				<TooltipText text={item.name} className='text text_type_main-medium' />
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
		</div>
	);
};
