import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router';
import styles from './root.module.css';
import AppHeader from '@/components/app-header/app-header';
import { Modal } from '@/components/modal/modal';
import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';

export const Root = () => {
	const location = useLocation();
	const background = location.state?.background;
	const navigate = useNavigate();

	console.log(background, 'root');

	return (
		<div className={styles.app}>
			<AppHeader />
			<Outlet context={{ background }} />
			{background && (
				<Routes>
					<Route
						path='/ingredients/:id'
						element={
							<Modal title={''} closeModal={() => navigate(-1)}>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</div>
	);
};
