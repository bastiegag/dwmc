import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { styled, Box } from '@mui/material';

import 'assets/scss/_document.scss';
import { useAuth } from 'hooks';
import { Header, Navigation } from 'layouts';

const MainRoot = styled(Box, {
	name: 'Main',
	slot: 'root'
})(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	minHeight: '100vh',
	paddingBottom: theme.spacing(16.5)
}));

export const Main = () => {
	const navigate = useNavigate();
	const { user } = useAuth();

	useEffect(() => {
		if (!user) {
			navigate('/', { replace: true });
		}
	}, [user, navigate]);

	return (
		<MainRoot className="Main-root">
			<Header />
			<Outlet />
			<Navigation />
		</MainRoot>
	);
};
