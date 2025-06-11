import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';
import styles from '../pages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	ingredientDetailState,
	setIngredientForShowDetail,
} from '@/services/slices/ingredientsSlice';
import { useParams } from 'react-router';
import { useEffect } from 'react';

export const IngredientPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const ingredient = useSelector(ingredientDetailState);

	useEffect(() => {
		dispatch(setIngredientForShowDetail(id));
	}, [id]);

	console.log('page');
	return (
		<main className={`${styles.page} ${styles.page_margin_base}`}>
			{ingredient && <IngredientDetails />}
		</main>
	);
};
