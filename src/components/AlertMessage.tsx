import { useCallback } from 'react';
import { IconX } from '@tabler/icons-react';
import { Alert, Snackbar, IconButton, Slide } from '@mui/material';

import { useAlert } from 'hooks';

export const AlertMessage = () => {
	const { alert, setAlert } = useAlert();

	const handleClose = useCallback(() => {
		setAlert({ ...alert, open: false });
	}, [alert, setAlert]);

	return (
		<Snackbar
			open={alert.open}
			onClose={handleClose}
			autoHideDuration={5000}
			slots={{ transition: Slide }}
			slotProps={{ transition: { direction: 'up' } }}
			sx={(theme) => ({
				bottom: theme.spacing(11.5),
				right: theme.spacing(2),
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
