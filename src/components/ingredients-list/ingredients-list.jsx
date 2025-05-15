import { forwardRef } from 'react';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import styles from './ingredients-list.module.css';

export const IngredientList = forwardRef(
	({ name, type, ingredients, onClick }, ref) => {
		return (
			<li ref={ref}>
				<h2 className='text text_type_main-medium mb-6'>{name}</h2>
				<ul className={styles.container}>
					{ingredients
						.filter((item) => item.type === type)
						.map((elem) => (
							<IngredientItem
								ingredient={elem}
								key={elem._id}
								onClick={onClick}
							/>
						))}
				</ul>
			</li>
		);
	}
);
