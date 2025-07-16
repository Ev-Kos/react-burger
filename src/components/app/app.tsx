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
import { useSelector } from 'react-redux';
import { ingredientsSelectors } from '@/services/selectors/ingredientsSelector';
import { useMinimumLoading } from '@/services/hooks/useMinimumLoading';
import { LOADING_DELAY } from '@/utils/constants';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/services/store';
import { fetchIngredients } from '@/services/slices/ingredientsSlice';
import { FeedDetail } from '@/pages/feed-detail/feed-detail';

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state?.background;
	const ingredients = useSelector(ingredientsSelectors.getIngredients);
	const [isLocalLoading, executeWithLoading] = useMinimumLoading(LOADING_DELAY);

	const isMounted = useRef(true);
	const dispatch = useAppDispatch();

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
		<div className={styles.app}>
			<AppHeader />
			<Routes location={background || location}>
				<Route
					path={ROUTEPATHS.home}
					element={<HomePage isLocalLoading={Boolean(isLocalLoading)} />}
				/>
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
				<Route
					path={ROUTEPATHS.ingredientId}
					element={<IngredientPage isLocalLoading={Boolean(isLocalLoading)} />}
				/>
				<Route path={ROUTEPATHS.feed} element={<FeedPage />} />
				<Route path={ROUTEPATHS.notFound} element={<NotFoundPage />} />
				<Route path={ROUTEPATHS.feedId} element={<FeedDetail />} />
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
