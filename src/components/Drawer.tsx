import React from 'react';
import {
	SwipeableDrawer,
	Box,
	IconButton,
	Typography,
	styled
} from '@mui/material';
import { IconChevronDown } from '@tabler/icons-react';

interface IDrawerProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	fullScreen?: boolean;
	title?: string;
}

const DrawerHeader = styled(Box)(({ theme }) => ({
	alignItems: 'center',
	display: 'grid',
	gridTemplateColumns: '1fr 2fr 1fr',
	justifyContent: 'center',
	textAlign: 'center',
	padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
	borderBottom: '1px solid ' + theme.palette.grey[50],
	button: {
		marginRight: 'auto'
	}
}));

export const Drawer = ({
	open,
	setOpen,
	fullScreen,
	title,
	children
}: React.PropsWithChildren<IDrawerProps>) => {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<SwipeableDrawer
			anchor="bottom"
			open={open}
			onClose={handleClose}
			onOpen={() => setOpen(true)}
			sx={(theme) => ({
				'.MuiDrawer-paper': {
					borderTopLeftRadius: theme.spacing(2),
					borderTopRightRadius: theme.spacing(2),
					overflow: 'visible',
					height: fullScreen ? 'calc(100vh - 24px)' : 'auto'
				}
			})}
		>
			<Box
				className="dwmc-drawer"
				sx={{ position: 'relative', height: '100%' }}
			>
				<DrawerHeader>
					<IconButton onClick={handleClose}>
						<IconChevronDown />
					</IconButton>
					{title && <Typography variant="overline">{title}</Typography>}
				</DrawerHeader>

				<Box
					sx={{
						overflow: 'auto',
						height: 'calc(100% - 104px)'
					}}
				>
					{children}
				</Box>
			</Box>
		</SwipeableDrawer>
	);
};
