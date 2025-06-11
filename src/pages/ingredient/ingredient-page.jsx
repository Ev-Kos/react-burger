import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';
import styles from '../pages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchIngredients,
	setIngredientForShowDetail,
} from '@/services/slices/ingredientsSlice';
import { useLocation, useParams } from 'react-router';
import { useEffect, useRef } from 'react';
import { ingredientsSelectors } from '@/services/selectors/ingredientsSelector';
import { useMinimumLoading } from '@/services/hooks/useMinimumLoading';
import { Loader } from '@/components/loader/loader';

export const IngredientPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const location = useLocation();
	const ingredients = useSelector(ingredientsSelectors.getIngredients);

	const [isLocalLoading, executeWithLoading] = useMinimumLoading(1000);
	const isMounted = useRef(true);

	useEffect(() => {
		isMounted.current = true;

		const loadIngredients = async () => {
			try {
				await executeWithLoading(() => dispatch(fetchIngredients()).unwrap());
				dispatch(setIngredientForShowDetail(id));
			} catch (e) {
				if (isMounted.current) {
					console.error(`Ошибка getIngredientsApi: ${e}`);
				}
			}
		};

		if (ingredients.length === 0) {
			loadIngredients();
		} else {
			dispatch(setIngredientForShowDetail(id));
		}

		return () => {
			isMounted.current = false;
		};
	}, [dispatch, executeWithLoading]);

	if (location.state?.background) {
		return null;
	}
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
