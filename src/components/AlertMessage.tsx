import { IconX } from '@tabler/icons-react';
import { Alert, Box, Collapse, IconButton } from '@mui/material';

import { useAlert } from 'hooks/useAlert';

export const AlertMessage = () => {
	const { alert, setAlert } = useAlert();

	const handleClose = () => {
		setAlert({ ...alert, open: false });
	};

	return (
		<Box>
			<Collapse in={alert.open}>
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
			</Collapse>
		</Box>
	);
};
