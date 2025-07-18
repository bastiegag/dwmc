import { FC } from 'react';
import { ListItem, ListItemText } from '@mui/material';

interface EmptyListProps {
	message: string;
}

export const EmptyList: FC<EmptyListProps> = ({ message }) => {
	return (
		<ListItem sx={{ py: 1 }}>
			<ListItemText primary={message} />
		</ListItem>
	);
};
