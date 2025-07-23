import { TIngredientWithCount } from '@/utils/types';
import { RoundImage } from '../round-image/round-image';
import styles from './feed-detail-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const FeedDetailItem = ({ item }: { item: TIngredientWithCount }) => {
	return (
		<li className={`${styles.container} mr-6`}>
			<div className={styles.image_and_name}>
				<RoundImage src={item.image_mobile} />
				<p className='text text_type_main-medium'>{item.name}</p>
			</div>
			<div className={styles.price_count_wrap}>
				<p
					className={`${styles.price_and_count} text text_type_digits-default`}>{`${item.count} x ${item.price}`}</p>
				<CurrencyIcon type='primary' />
			</div>
		</li>
	);
};
