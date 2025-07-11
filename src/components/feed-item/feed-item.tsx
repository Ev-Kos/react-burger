import { TOrder } from '@/utils/types';
import styles from './feed-item.module.css';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ingredientsSelectors } from '@/services/selectors/ingredientsSelector';

type TFeedItemProps = {
	item: TOrder;
};

export const FeedItem = ({ item }: TFeedItemProps) => {
	const ingredients = useSelector(ingredientsSelectors.getIngredients);
	const images = useMemo(() => {
		let res: string[] = [];
		item.ingredients.forEach((el) => {
			const ingredient = ingredients.find((i) => i._id === el);
			if (ingredient) {
				res = [...res, ingredient?.image_mobile];
			}
		});
		return res;
	}, [item, ingredients]);

	const price = 0;

	return (
		<div className={styles.item}>
			<div className={styles.item_order_info}>
				<p
					className={`${styles.item_order_number} text text_type_digits-medium`}>
					{item.number}
				</p>
				<p
					className={`${styles.item_order_time} text text_type_main-default text_color_inactive`}>
					{item.createdAt}
				</p>
			</div>
			<p className='text text_type_main-medium'>{item.name}</p>
			<div className={styles.images_and_price}>
				<ul>
					{images.map((item) => (
						<img src={item} alt='' />
					))}
				</ul>
				<div>
					<p>{price}</p>
				</div>
			</div>
		</div>
	);
};
