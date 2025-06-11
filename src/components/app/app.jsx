import { router } from '@/pages/routes/routes';
import { RouterProvider } from 'react-router';

export const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
