import { Auth } from 'layouts';
import { Login, SignUp, Error } from 'pages';

export const nonProtectedRoutes = [
	{
		path: '/',
		element: <Auth />,
		errorElement: <Error />,
		children: [
			{
				path: '',
				element: <Login />
			},
			{
				path: 'signup',
				element: <SignUp />
			}
		]
	}
];
