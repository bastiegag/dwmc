import { Outlet } from 'react-router';
import { Box, styled } from '@mui/material';

import 'assets/scss/_document.scss';

const Content = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.common.white,
	height: '100vh',
	padding: theme.spacing(4)
}));

export const Auth = () => {
	return (
		<Content>
			<Outlet />
		</Content>
	);
};
