import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
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
	title?: string;
	fullscreen?: boolean;
	anchor?: 'bottom' | 'right';
	action?: React.ReactNode;
}

export const Drawer = ({
	open,
	setOpen,
	title,
	fullscreen = false,
	anchor = 'bottom',
	action,
	children
}: React.PropsWithChildren<DrawerProps>) => {
	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	let height = '43vh';
	if (fullscreen) {
		if (anchor == 'bottom') {
			height = 'calc(100vh - 24px)';
		} else {
			height = '100vh';
		}
	}

	return (
		<SwipeableDrawer
			anchor={anchor}
			open={open}
			onClose={handleClose}
			onOpen={handleOpen}
			ModalProps={{
				keepMounted: false
			}}
			sx={(theme) => ({
				'.MuiDrawer-paper': {
					borderTopLeftRadius: anchor == 'bottom' ? theme.spacing(2) : 0,
					borderTopRightRadius: anchor == 'bottom' ? theme.spacing(2) : 0,
					overflow: 'visible',
					height: height,
					width: anchor == 'bottom' ? 'auto' : '100%'
				}
			})}
		>
			<Box
				className="dwmc-drawer"
				sx={{ position: 'relative', height: '100%' }}
			>
				<DrawerHeader>
					<IconButton onClick={handleClose}>
						{anchor == 'bottom' ? <IconChevronDown /> : <IconChevronRight />}
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
