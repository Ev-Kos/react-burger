import { forwardRef } from 'react';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import styles from './ingredients-list.module.css';
import { ingredientType } from '@/utils/types';
import { arrayOf, func, string } from 'prop-types';

export const IngredientList = forwardRef(
	({ name, type, ingredients, setIngredient }, ref) => {
		const onClickIngredient = (elem) => {
			setIngredient(elem);
		};

		return (
			<li ref={ref}>
				<h2 className='text text_type_main-medium mb-6'>{name}</h2>
				<ul className={`${styles.container} pl-3`}>
					{ingredients &&
						ingredients
							.filter((item) => item.type === type)
							.map((elem) => (
								<IngredientItem
									ingredient={elem}
									key={elem._id}
									onClick={() => onClickIngredient(elem)}
								/>
							))}
				</ul>
			</li>
		);
	}
);

IngredientList.propTypes = {
	name: string.isRequired,
	type: string.isRequired,
	ingredients: arrayOf(ingredientType).isRequired,
	setIngredient: func.isRequired,
};
