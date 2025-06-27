import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import {
	ingredientDetailState,
	setIngredientForShowDetail,
} from '@/services/slices/ingredientsSlice';
import { bool } from 'prop-types';
import { ingredientsSelectors } from '@/services/selectors/ingredientsSelector';
import { useMinimumLoading } from '@/services/hooks/useMinimumLoading';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { Loader } from '@/components/loader/loader';
import { LOADING_DELAY } from '@/utils/constants';
import { useAppDispatch } from '@/services/store';

export const IngredientDetails = ({ isModal }: { isModal?: boolean }) => {
	const ingredient = useSelector(ingredientDetailState);
	const ingredients = useSelector(ingredientsSelectors.getIngredients);
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const [isLocalLoading, executeWithLoading] = useMinimumLoading(LOADING_DELAY);

	useEffect(() => {
		const loadIngredient = async () => {
			try {
				if (typeof executeWithLoading === 'function') {
					executeWithLoading(async () =>
						dispatch(setIngredientForShowDetail(id))
					);
				}
			} catch (e) {
				console.error(`Ошибка getIngredientsApi: ${e}`);
			}
		};
		if (id && ingredients.length !== 0 && !ingredient) {
			loadIngredient();
		}
	}, [id, ingredients.length, dispatch, executeWithLoading, ingredient]);

	return (
		<>
			{isLocalLoading && isModal ? (
				<div className={styles.loader}>
					<Loader />
				</div>
			) : (
				<>
					{ingredient && (
						<div className={`${styles.container} pr-25 pb-15 pl-25`}>
							<img
								className={styles.image}
								src={ingredient?.image}
								alt={ingredient?.name}
							/>
							<p
								className={`${styles.title} text text_type_main-medium mt-4 mb-8`}>
								{ingredient?.name}
							</p>
							<ul
								className={`${styles.list} text text_type_main-default text_color_inactive`}>
								<li className={`${styles.element} mr-5`}>
									<p className='text text_type_main-default text_color_inactive mb-2'>
										Калории, ккал
									</p>
									<p
										className={`${styles.title} text text_type_main-default text_color_inactive`}>
										{ingredient?.calories}
									</p>
								</li>
								<li className={`${styles.element} mr-5`}>
									<p className='text text_type_main-default text_color_inactive mb-2'>
										Белки, г
									</p>
									<p
										className={`${styles.title} text text_type_main-default text_color_inactive`}>
										{ingredient?.proteins}
									</p>
								</li>
								<li className={`${styles.element} mr-5`}>
									<p className='text text_type_main-default text_color_inactive mb-2'>
										Жиры, г
									</p>
									<p
										className={`${styles.title} text text_type_main-default text_color_inactive`}>
										{ingredient?.fat}
									</p>
								</li>
								<li className={`${styles.element} mr-5`}>
									<p className='text text_type_main-default text_color_inactive mb-2'>
										Углеводы, г
									</p>
									<p
										className={`${styles.title} text text_type_main-default text_color_inactive`}>
										{ingredient?.carbohydrates}
									</p>
								</li>
							</ul>
						</div>
					)}
				</>
			)}
		</>
	);
};

IngredientDetails.propsType = {
	isModal: bool,
};
