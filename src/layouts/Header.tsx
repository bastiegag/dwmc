import { useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, IconButton, styled, Typography } from '@mui/material';
import { IconUser } from '@tabler/icons-react';

import { logout } from 'services/authentication';
import { useAlert } from 'hooks';
import { Logo } from 'components';

const HeaderRoot = styled(Box, {
	name: 'Header',
	slot: 'root'
})(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	alignItems: 'center',
	justifyContent: 'space-between',
	display: 'flex',
	padding: theme.spacing(2)
}));

const APP_TITLE = "Dude, where's my cash?";

const PAGE_TITLES: Record<string, string> = {
	'/': APP_TITLE,
	'/budgets': 'Budgets',
	'/wallets': 'Wallets',
	'/settings': 'Settings'
};

export const Header = () => {
	const location = useLocation();
	const { setAlert } = useAlert();

	const title = useMemo(
		() => PAGE_TITLES[location.pathname] || APP_TITLE,
		[location.pathname]
	);

	useEffect(() => {
		document.title =
			location.pathname === '/'
				? APP_TITLE
				: `${APP_TITLE} | ${PAGE_TITLES[location.pathname]}`;
	}, [location.pathname]);

	const handleLogout = useCallback(() => {
		logout().catch((error) => {
			console.error('Logout error:', error.code);
		});
	}, []);

	const handleMessage = useCallback(() => {
		setAlert({
			open: true,
			type: 'info',
			message: 'This feature is not implemented yet.'
		});
	}, [setAlert]);

	return (
		<HeaderRoot className="Header-root">
			<IconButton onClick={handleMessage} sx={{ color: 'white' }}>
				<Logo size={24} />
			</IconButton>
			<Typography
				variant="overline"
				sx={{ color: 'white', fontWeight: 'bold' }}
			>
				{title}
			</Typography>
			<IconButton onClick={handleLogout} sx={{ color: 'white' }}>
				<IconUser />
			</IconButton>
		</HeaderRoot>
	);
};
