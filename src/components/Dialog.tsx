import type { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import {
	Button,
	Dialog as MuiDialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions
} from '@mui/material';

interface DialogProps {
	setOpen: Dispatch<SetStateAction<boolean>>;
	open: boolean;
	action: () => void;
}

export const Dialog = ({ open, setOpen, action }: DialogProps) => {
	const handleClose = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	return (
		<MuiDialog open={open} onClose={handleClose}>
			<DialogTitle>Are you sure you want to delete this item?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Deleting this item cannot be undone.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color="inherit" onClick={handleClose}>
					Cancel
				</Button>
				<Button color="error" onClick={action}>
					Delete
				</Button>
			</DialogActions>
		</MuiDialog>
	);
};
