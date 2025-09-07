import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, IconButton, styled, Typography } from '@mui/material';
import { IconUser } from '@tabler/icons-react';

import * as AuthenticationService from 'services/authentication';
import { useAlert } from 'hooks';
import { Logo } from 'components';

const LogoWrapper = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	alignItems: 'center',
	justifyContent: 'space-between',
	display: 'flex',
	padding: theme.spacing(2)
}));

const titles: { [key: string]: string } = {
	'/': "Dude, where's my cash?",
	'/budgets': 'Budgets',
	'/wallets': 'Wallets',
	'/settings': 'Settings'
};

export const Header = () => {
	const location = useLocation();
	const [title, setTitle] = useState(titles['/']);
	const { setAlert } = useAlert();

	useEffect(() => {
		document.title = `Dude, where's my cash? | ${
			location.pathname === '/'
				? "Dude, where's my cash?"
				: titles[location.pathname]
		}`;
		setTitle(titles[location.pathname]);
	}, [location.pathname]);

	const handleLogout = () => {
		AuthenticationService.logout()
			.then(() => {})
			.catch((error) => {
				console.error(error.code);
			});
	};

	const handleMessage = () => {
		setAlert({
			open: true,
			type: 'info',
			message: 'This feature is not implemented yet.'
		});
	};

	return (
		<header>
			<LogoWrapper>
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
			</LogoWrapper>
		</header>
	);
};
