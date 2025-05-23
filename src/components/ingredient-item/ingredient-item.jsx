import { ingredientType } from '@/utils/types';
import styles from './ingredient-item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { func } from 'prop-types';

export const IngredientItem = ({ ingredient, onClick }) => {
	return (
		<li className={styles.list_item}>
			<button className={styles.button} onClick={onClick}>
				<Counter count={1} size='default' />
				<img
					className={styles.image}
					src={ingredient.image}
					alt={ingredient.name}
				/>
				<div className={styles.price_wrap}>
					<p className={`${styles.price} text text_type_digits-default`}>
						{ingredient.price}
					</p>
					<CurrencyIcon type='primary' />
				</div>
				<p className={`${styles.name} text text_type_main-default`}>
					{ingredient.name}
				</p>
			</button>
		</li>
	);
};

IngredientItem.propTypes = {
	ingredient: ingredientType.isRequired,
	onClick: func.isRequired,
};
