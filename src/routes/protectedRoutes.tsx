import { Main } from 'layouts';
import { Home, Wallets, Error } from 'pages';

export const protectedRoutes = [
	{
		path: '/',
		element: <Main />,
		errorElement: <Error />,
		children: [
			{
				path: '',
				element: <Home />
			},
			{
				path: 'wallets',
				element: <Wallets />
			}
		]
	}
];
