import { TIngredient } from '@/utils/types';
import styles from './ingredient-item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { selectedIngredientsState } from '@/services/slices/selectedIngredients';
import { INGREDIENT_TYPES } from '@/utils/constants';
import { Link, useLocation } from 'react-router';
import { useAppSelector } from '@/services/store';

type TIngredientItem = {
	ingredient: TIngredient;
	onClick: VoidFunction;
};

export const IngredientItem = ({ ingredient, onClick }: TIngredientItem) => {
	const location = useLocation();
	const selectedIngredients = useAppSelector(selectedIngredientsState);

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
			<Link
				to={`/ingredients/${ingredient._id}`}
				state={{ background: location }}>
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
			</Link>
		</li>
	);
};
