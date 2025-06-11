import { ROUTEPATHS } from '@/utils/routes';
import { Root } from '../root/root';
import { HomePage } from '../home/home-page';
import { LoginPage } from '../login/login-page';
import { createBrowserRouter } from 'react-router';
import { RegistrationPage } from '../registration/registration-page';

const routes = [
	{
		path: ROUTEPATHS.home,
		element: <Root />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: ROUTEPATHS.login, element: <LoginPage /> },
			{ path: ROUTEPATHS.registr, element: <RegistrationPage /> },
		],
	},
];

export const router = createBrowserRouter(routes);
