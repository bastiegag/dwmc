import { Outlet } from 'react-router';
import { Box, styled } from '@mui/material';

import 'assets/scss/_document.scss';

const Content = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	minHeight: '100vh'
}));

export const Auth = () => {
	return (
		<Content>
			<Outlet />
		</Content>
	);
};
