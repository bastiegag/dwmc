import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { protectedRoutes } from './protectedRoutes';
import { nonProtectedRoutes } from './nonProtectedRoutes';
import { useAuth } from 'hooks';

const Routes = () => {
	const { user } = useAuth();

	const router = useMemo(
		() =>
			createBrowserRouter([
				...(!user ? nonProtectedRoutes : []),
				...protectedRoutes
			]),
		[user]
	);

	return <RouterProvider router={router} />;
};

export default Routes;
