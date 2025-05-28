import { forwardRef } from 'react';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import styles from './ingredients-list.module.css';
import { ingredientType } from '@/utils/types';
import { arrayOf, string } from 'prop-types';
import { useDispatch } from 'react-redux';
import { setIngredientForShowDetail } from '@/services/slices/ingredientsSlice';

export const IngredientList = forwardRef(({ name, type, ingredients }, ref) => {
	const dispatch = useDispatch();

	const onClickIngredient = (id) => {
		dispatch(setIngredientForShowDetail(id));
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
								onClick={() => onClickIngredient(elem._id)}
							/>
						))}
			</ul>
		</li>
	);
});

IngredientList.propTypes = {
	name: string.isRequired,
	type: string.isRequired,
	ingredients: arrayOf(ingredientType).isRequired,
};
