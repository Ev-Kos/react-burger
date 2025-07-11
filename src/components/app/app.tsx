import { ROUTEPATHS } from '@/utils/routes';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { ProtectedRoute } from '../protected-route/protected-route';
import { LoginPage } from '@/pages/login/login-page';
import { HomePage } from '@/pages/home/home-page';
import { RegistrationPage } from '@/pages/registration/registration-page';
import { ForgotPassword } from '@/pages/forgot-password/forgot-password-page';
import { ResetPassword } from '@/pages/reset-password/reset-password-page';
import { ProfilePage } from '@/pages/profile/profile-page';
import { IngredientPage } from '@/pages/ingredient/ingredient-page';
import { NotFoundPage } from '@/pages/not-found/not-found-page';
import styles from './app.module.css';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { AppHeader } from '../app-header/app-header';
import { FeedPage } from '@/pages/feed/feed-page';

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state?.background;
	return (
		<div className={styles.app}>
			<AppHeader />
			<Routes location={background || location}>
				<Route path={ROUTEPATHS.home} element={<HomePage />} />
				<Route
					path={ROUTEPATHS.login}
					element={<ProtectedRoute component={<LoginPage />} isUnauth />}
				/>
				<Route
					path={ROUTEPATHS.registr}
					element={<ProtectedRoute component={<RegistrationPage />} isUnauth />}
				/>
				<Route
					path={ROUTEPATHS.forgotPass}
					element={<ProtectedRoute component={<ForgotPassword />} isUnauth />}
				/>
				<Route
					path={ROUTEPATHS.resetPass}
					element={
						<ProtectedRoute component={<ResetPassword />} forResetPassword />
					}
				/>
				<Route
					path={ROUTEPATHS.profile}
					element={<ProtectedRoute component={<ProfilePage />} isAuth />}
				/>
				<Route path={ROUTEPATHS.ingredientId} element={<IngredientPage />} />
				<Route path={ROUTEPATHS.feed} element={<FeedPage />} />
				<Route path={ROUTEPATHS.notFound} element={<NotFoundPage />} />
			</Routes>
			{background && (
				<Routes>
					<Route
						path={ROUTEPATHS.ingredientId}
						element={
							<Modal title='' closeModal={() => navigate(-1)}>
								<IngredientDetails isModal />
							</Modal>
						}
					/>
				</Routes>
			)}
		</div>
	);
};

export default App;
