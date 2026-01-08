import { IconPencil } from '@tabler/icons-react';
import {
	IconButton,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useTheme
} from '@mui/material';
import { useCallback } from 'react';

import type { CategoryItem, WalletItem } from 'types';
import { Icon } from 'components';

type ItemType = {
	id: string;
	name?: string;
	icon?: string;
	color?: string;
};

interface ListChoiceProps {
	data: CategoryItem | WalletItem | ItemType;
	selected: boolean;
	small?: boolean;
	round?: boolean;
	edit?: boolean;
	handleClose: (value: string, label?: string) => void;
	handleEdit?: (item: CategoryItem | WalletItem | ItemType) => void;
}

export const ListChoice = ({
	data,
	selected,
	small,
	round = true,
	edit = false,
	handleEdit,
	handleClose
}: ListChoiceProps) => {
	const theme = useTheme();

	const handleClick = useCallback(() => {
		handleClose(data.id, data.name);
	}, [handleClose, data.id, data.name]);

	const handleEditClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			if (handleEdit) {
				handleEdit(data);
			}
		},
		[handleEdit, data]
	);

	if (small) {
		return (
			<IconButton
				onClick={handleClick}
				sx={{ ...(selected && { bgcolor: 'grey.100' }) }}
			>
				<Icon icon={data.icon} color={data.color} />
			</IconButton>
		);
	}

	return (
		<ListItemButton onClick={handleClick} selected={selected}>
			{data.icon && (
				<ListItemIcon>
					<Icon icon={data.icon} color={data.color} round={round} />
				</ListItemIcon>
			)}
			<ListItemText primary={data.name} />
			{edit && handleEdit && (
				<IconButton color="primary" onClick={handleEditClick}>
					<IconPencil color={theme.palette.primary.main} />
				</IconButton>
			)}
		</ListItemButton>
	);
};
