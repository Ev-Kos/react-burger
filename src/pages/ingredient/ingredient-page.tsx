import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';
import styles from '../pages.module.css';
import { useSelector } from 'react-redux';
import { fetchIngredients } from '@/services/slices/ingredientsSlice';
import { useEffect, useRef } from 'react';
import { ingredientsSelectors } from '@/services/selectors/ingredientsSelector';
import { useMinimumLoading } from '@/services/hooks/useMinimumLoading';
import { Loader } from '@/components/loader/loader';
import { LOADING_DELAY } from '@/utils/constants';
import { useAppDispatch } from '@/services/store';

export const IngredientPage = () => {
	const dispatch = useAppDispatch();

	const ingredients = useSelector(ingredientsSelectors.getIngredients);

	const [isLocalLoading, executeWithLoading] = useMinimumLoading(LOADING_DELAY);
	const isMounted = useRef(true);

	useEffect(() => {
		isMounted.current = true;

		const loadIngredients = async () => {
			try {
				if (typeof executeWithLoading === 'function') {
					await executeWithLoading(() => dispatch(fetchIngredients()).unwrap());
				}
			} catch (e) {
				if (isMounted.current) {
					console.error(`Ошибка getIngredientsApi: ${e}`);
				}
			}
		};
		if (ingredients.length === 0) {
			loadIngredients();
		}

		return () => {
			isMounted.current = false;
		};
	}, [dispatch, executeWithLoading, ingredients.length]);

	return (
		<>
			{isLocalLoading ? (
				<Loader />
			) : (
				<main className={`${styles.page} ${styles.page_margin_base}`}>
					<IngredientDetails />
				</main>
			)}
		</>
	);
};
