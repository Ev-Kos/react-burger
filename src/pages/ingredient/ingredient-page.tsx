import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';
import styles from '../pages.module.css';
import { Loader } from '@/components/loader/loader';

export const IngredientPage = ({
	isLocalLoading,
}: {
	isLocalLoading: boolean;
}) => {
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
