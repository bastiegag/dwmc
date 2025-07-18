import { Box, IconButton, styled } from '@mui/material';
import { IconUser, IconPower } from '@tabler/icons-react';

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

export const Header = () => {
	const { setAlert } = useAlert();

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
			type: 'error',
			message: 'This feature is not implemented yet.'
		});
	};

	return (
		<header>
			<LogoWrapper>
				<IconButton onClick={handleMessage} sx={{ color: 'white' }}>
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
