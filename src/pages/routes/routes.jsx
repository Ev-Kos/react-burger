import { ROUTEPATHS } from '@/utils/routes';
import { Root } from '../root/root';
import { HomePage } from '../home/home-page';
import { LoginPage } from '../login/login-page';
import { createBrowserRouter } from 'react-router';
import { RegistrationPage } from '../registration/registration-page';
import { ForgotPassword } from '../forgot-password/forgot-password-page';
import { ResetPassword } from '../reset-password/reset-password-page';
import { ProfilePage } from '../profile/profile-page';
import { IngredientPage } from '../ingredient/ingredient-page';
import { NotFoundPage } from '../not-found/not-found-page';
import { ProtectedRoute } from '@/components/protected-route/protected-route';

const routes = [
	{
		path: ROUTEPATHS.home,
		element: <Root />,
		children: [
			{ index: true, element: <HomePage /> },
			{
				path: ROUTEPATHS.login,
				element: <ProtectedRoute component={<LoginPage />} isUnauth />,
			},
			{
				path: ROUTEPATHS.registr,
				element: <ProtectedRoute component={<RegistrationPage />} isUnauth />,
			},
			{
				path: ROUTEPATHS.forgotPass,
				element: <ProtectedRoute component={<ForgotPassword />} isUnauth />,
			},
			{
				path: ROUTEPATHS.resetPass,
				element: (
					<ProtectedRoute component={<ResetPassword />} forResetPassword />
				),
			},
			{
				path: ROUTEPATHS.profile,
				element: <ProtectedRoute component={<ProfilePage />} isAuth />,
			},
			{ path: '/ingredients/:id', element: <IngredientPage /> },
			{ path: ROUTEPATHS.notFound, element: <NotFoundPage /> },
		],
	},
];

export const router = createBrowserRouter(routes);
