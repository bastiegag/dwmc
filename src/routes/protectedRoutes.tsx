import { Main } from 'layouts';
import { Home, Budgets, Wallets, Settings, Error } from 'pages';

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
				path: 'budgets',
				element: <Budgets />
			},
			{
				path: 'wallets',
				element: <Wallets />
			},
			{
				path: 'settings',
				element: <Settings />
			}
		]
	}
];
