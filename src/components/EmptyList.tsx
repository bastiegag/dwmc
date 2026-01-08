import { ListItem, ListItemText } from '@mui/material';

interface EmptyListProps {
	message: string;
}

export const EmptyList = ({ message }: EmptyListProps) => {
	return (
		<ListItem sx={{ py: 1 }}>
			<ListItemText primary={message} />
		</ListItem>
	);
};
