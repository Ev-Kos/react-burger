import { forwardRef } from 'react';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import styles from './ingredients-list.module.css';
import { TIngredient } from '@/utils/types';
import { setIngredientForShowDetail } from '@/services/slices/ingredientsSlice';
import { useAppDispatch } from '@/services/store';

type TIngredientList = {
	name: string;
	type: string;
	ingredients: TIngredient[];
};

export const IngredientList = forwardRef<HTMLLIElement, TIngredientList>(
	({ name, type, ingredients }, ref) => {
		const dispatch = useAppDispatch();

		const onClickIngredient = (id: string) => {
			dispatch(setIngredientForShowDetail(id));
		};

		return (
			<li ref={ref}>
				<h2 className='text text_type_main-medium mb-6'>{name}</h2>
				<ul className={`${styles.container} pl-3`}>
					{ingredients.length !== 0 &&
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
	}
);
