import { Main } from 'layouts';
import { Home, Error } from 'pages';

export const protectedRoutes = [
	{
		path: '/',
		element: <Main />,
		errorElement: <Error />,
		children: [
			{
				path: '',
				element: <Home />
			}
		]
	}
];
