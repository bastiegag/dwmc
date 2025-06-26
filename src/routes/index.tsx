import { createBrowserRouter, RouterProvider } from 'react-router';

import { protectedRoutes } from './protectedRoutes';
import { nonProtectedRoutes } from './nonProtectedRoutes';
import { useAuth } from 'hooks';

const Routes = () => {
	const { user } = useAuth();

	const router = createBrowserRouter([
		...(!user ? nonProtectedRoutes : []),
		...protectedRoutes
	]);

	return <RouterProvider router={router} />;
};

export default Routes;
