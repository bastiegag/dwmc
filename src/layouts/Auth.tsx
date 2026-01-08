import { Outlet } from 'react-router';
import { Box, styled } from '@mui/material';

import 'assets/scss/_document.scss';

const AuthRoot = styled(Box, {
	name: 'Auth',
	slot: 'root'
})(({ theme }) => ({
	backgroundColor: theme.palette.common.white,
	height: '100vh',
	padding: theme.spacing(4)
}));

export const Auth = () => {
	return (
		<AuthRoot className="Auth-root">
			<Outlet />
		</AuthRoot>
	);
};
