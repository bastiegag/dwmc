import { IconButton, styled } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';

interface IAddButtonProps {
	onClick?: React.MouseEventHandler;
}

const Button = styled(IconButton)(({ theme }) => ({
	position: 'absolute',
	bottom: theme.spacing(9),
	right: theme.spacing(2),
	color: 'white',
	backgroundColor: theme.palette.primary.main,
	'&:hover': {
		backgroundColor: theme.palette.primary.light
	}
}));

export const AddButton = ({ onClick }: IAddButtonProps) => {
	return (
		<Button onClick={onClick}>
			<IconPlus />
		</Button>
	);
};
