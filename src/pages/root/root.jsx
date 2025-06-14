import { Outlet, useNavigate, useLocation, useMatch } from 'react-router';
import styles from './root.module.css';
import AppHeader from '@/components/app-header/app-header';
import { Modal } from '@/components/modal/modal';
import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';

export const Root = () => {
	const location = useLocation();
	const background = location.state?.background;
	const navigate = useNavigate();
	const isIngredientsModal = useMatch('/ingredients/:id');

	return (
		<div className={styles.app}>
			<AppHeader />
			<Outlet />

			{background && isIngredientsModal && (
				<Modal title='' closeModal={() => navigate(-1)}>
					<IngredientDetails />
				</Modal>
			)}
		</div>
	);
};
