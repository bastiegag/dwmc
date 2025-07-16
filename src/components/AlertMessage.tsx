import { IconX } from '@tabler/icons-react';
import { Alert, Snackbar, IconButton, Slide } from '@mui/material';

import { useAlert } from 'hooks/useAlert';

export const AlertMessage = () => {
	const { alert, setAlert } = useAlert();

	const handleClose = () => {
		setAlert({ ...alert, open: false });
	};

	return (
		<Snackbar
			open={alert.open}
			onClose={handleClose}
			slots={{ transition: Slide }}
			slotProps={{ transition: { direction: 'up' } }}
			sx={(theme) => ({
				bottom: theme.spacing(9),
				right: theme.spacing(9),
				left: theme.spacing(2)
			})}
		>
			<Alert
				severity={alert.type}
				action={
					<IconButton
						aria-label="fermer"
						color="inherit"
						size="small"
						onClick={handleClose}
					>
						<IconX />
					</IconButton>
				}
			>
				{alert.message}
			</Alert>
		</Snackbar>
	);
};
