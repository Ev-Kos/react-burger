import { ROUTEPATHS } from '@/utils/routes';
import { Root } from '../root/root';
import { HomePage } from '../home/home-page';
import { LoginPage } from '../login/login-page';
import { createBrowserRouter } from 'react-router';
import { RegistrationPage } from '../registration/registration-page';
import { ForgotPassword } from '../forgot-password/forgot-password';

const routes = [
	{
		path: ROUTEPATHS.home,
		element: <Root />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: ROUTEPATHS.login, element: <LoginPage /> },
			{ path: ROUTEPATHS.registr, element: <RegistrationPage /> },
			{ path: ROUTEPATHS.forgotPass, element: <ForgotPassword /> },
		],
	},
];

export const router = createBrowserRouter(routes);
