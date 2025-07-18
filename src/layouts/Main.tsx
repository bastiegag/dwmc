import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { styled, Box } from '@mui/material';

import 'assets/scss/_document.scss';
import { useAuth } from 'hooks';
import { Header, Navigation } from 'layouts';

const Content = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	minHeight: '100vh',
	paddingBottom: theme.spacing(14)
}));

export const Main = () => {
	const navigate = useNavigate();
	const { user } = useAuth();

	useEffect(() => {
		if (!user) navigate('/');
	}, [user, navigate]);

	return (
		<Content>
			<Header />
			<Outlet />
			<Navigation />
		</Content>
	);
};
