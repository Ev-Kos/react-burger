import { RouterProvider } from 'react-router';
import { router } from '@/pages/routes/routes';

export const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
