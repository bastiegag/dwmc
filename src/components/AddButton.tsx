import { FC } from 'react';
import { IconButton, styled } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';

interface AddButtonProps {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const AddButton: FC<AddButtonProps> = ({ onClick }) => {
	return (
		<Button onClick={onClick}>
			<IconPlus />
		</Button>
	);
};

const Button = styled(IconButton)(({ theme }) => ({
	position: 'fixed',
	bottom: theme.spacing(11.5),
	right: theme.spacing(2),
	color: 'white',
	backgroundColor: theme.palette.primary.main,
	'&:hover': {
		backgroundColor: theme.palette.primary.light
	}
}));
