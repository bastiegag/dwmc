import { IconChevronDown } from '@tabler/icons-react';
import {
	SwipeableDrawer,
	Box,
	IconButton,
	Typography,
	styled
} from '@mui/material';

interface DrawerProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	fullScreen?: boolean;
	title?: string;
	action?: React.ReactNode;
}

export const Drawer = ({
	open,
	setOpen,
	fullScreen,
	title,
	action,
	children
}: React.PropsWithChildren<DrawerProps>) => {
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
					height: fullScreen ? 'calc(100vh - 24px)' : '43vh'
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
					{action && action}
				</DrawerHeader>

				<DrawerContent>{children}</DrawerContent>
			</Box>
		</SwipeableDrawer>
	);
};

const DrawerHeader = styled(Box)(({ theme }) => ({
	alignItems: 'center',
	display: 'grid',
	gridTemplateColumns: '1fr 2fr 1fr',
	justifyContent: 'center',
	textAlign: 'center',
	padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
	borderBottom: '1px solid ' + theme.palette.grey[50],
	'> button': {
		marginRight: 'auto'
	}
}));

const DrawerContent = styled(Box)(() => ({
	overflowY: 'auto',
	height: 'calc(100% - 57px)'
}));
