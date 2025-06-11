import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { ingredientDetailState } from '@/services/slices/ingredientsSlice';

export const IngredientDetails = () => {
	const ingredient = useSelector(ingredientDetailState);
	return (
		<>
			{ingredient && (
				<div className={`${styles.container} pr-25 pb-15 pl-25`}>
					<img
						className={styles.image}
						src={ingredient.image}
						alt={ingredient.name}
					/>
					<p className={`${styles.title} text text_type_main-medium mt-4 mb-8`}>
						{ingredient.name}
					</p>
					<ul
						className={`${styles.list} text text_type_main-default text_color_inactive`}>
						<li className={`${styles.element} mr-5`}>
							<p className='text text_type_main-default text_color_inactive mb-2'>
								Калории, ккал
							</p>
							<p
								className={`${styles.title} text text_type_main-default text_color_inactive`}>
								{ingredient.calories}
							</p>
						</li>
						<li className={`${styles.element} mr-5`}>
							<p className='text text_type_main-default text_color_inactive mb-2'>
								Белки, г
							</p>
							<p
								className={`${styles.title} text text_type_main-default text_color_inactive`}>
								{ingredient.proteins}
							</p>
						</li>
						<li className={`${styles.element} mr-5`}>
							<p className='text text_type_main-default text_color_inactive mb-2'>
								Жиры, г
							</p>
							<p
								className={`${styles.title} text text_type_main-default text_color_inactive`}>
								{ingredient.fat}
							</p>
						</li>
						<li className={`${styles.element} mr-5`}>
							<p className='text text_type_main-default text_color_inactive mb-2'>
								Углеводы, г
							</p>
							<p
								className={`${styles.title} text text_type_main-default text_color_inactive`}>
								{ingredient.carbohydrates}
							</p>
						</li>
					</ul>
				</div>
			)}
		</>
	);
};
