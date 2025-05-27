import { ingredientType } from '@/utils/types';
import styles from './ingredient-item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { func } from 'prop-types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { selectedIngredientsState } from '@/services/slices/selectedIngredients';
import { INGREDIENT_TYPES } from '@/utils/constants';

export const IngredientItem = ({ ingredient, onClick }) => {
	const selectedIngredients = useSelector(selectedIngredientsState);

	const bun = [...selectedIngredients].find(
		(item) => item.type === INGREDIENT_TYPES.BUN
	);

	const counter = [...selectedIngredients].filter(
		(item) => item._id === ingredient._id
	).length;

	const isBunSelected = bun && ingredient._id === bun._id;

	const [{ opacity }, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient,
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.5 : 1,
		}),
	});

	return (
		<li
			className={isBunSelected ? styles.list_item_exist : styles.list_item}
			style={{ opacity }}>
			<button
				className={styles.button}
				onClick={onClick}
				draggable
				ref={dragRef}>
				{counter !== 0 && <Counter count={counter} size='default' />}
				<div
					className={
						isBunSelected
							? styles.ingredient_info_exist
							: styles.ingredient_info
					}>
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
				</div>
			</button>
		</li>
	);
};

IngredientItem.propTypes = {
	ingredient: ingredientType.isRequired,
	onClick: func.isRequired,
};
