import { Box, IconButton, styled } from '@mui/material';
import { IconUser, IconPower } from '@tabler/icons-react';

import * as AuthenticationService from 'services/authentication';
import { Logo } from 'components';

const LogoWrapper = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	alignItems: 'center',
	justifyContent: 'space-between',
	display: 'flex',
	padding: theme.spacing(2)
}));

export const Header = () => {
	const handleLogout = () => {
		AuthenticationService.logout()
			.then(() => {})
			.catch((error) => {
				console.error(error.code);
			});
	};

	return (
		<header>
			<LogoWrapper>
				<IconButton sx={{ color: 'white' }}>
					<IconUser />
				</IconButton>
				<Logo size={32} />
				<IconButton onClick={handleLogout} sx={{ color: 'white' }}>
					<IconPower />
				</IconButton>
			</LogoWrapper>
		</header>
	);
};
