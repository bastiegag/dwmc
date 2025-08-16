import { FC } from 'react';
import { IconPencil } from '@tabler/icons-react';
import {
	IconButton,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useTheme
} from '@mui/material';

import { CategoryItem, WalletItem } from 'types';
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
	edit?: boolean;
	handleClose: (value: string, label?: string) => void;
	handleEdit?: (item: CategoryItem | WalletItem | ItemType) => void;
}

export const ListChoice: FC<ListChoiceProps> = ({
	data,
	selected,
	small,
	edit = false,
	handleEdit,
	handleClose
}) => {
	const theme = useTheme();

	return small ? (
		<IconButton
			onClick={() => handleClose(data.id, data.name)}
			sx={{ ...(selected && { bgcolor: 'grey.100' }) }}
		>
			<Icon icon={data.icon} color={data.color} />
		</IconButton>
	) : (
		<ListItemButton
			onClick={() => handleClose(data.id, data.name)}
			selected={selected}
		>
			{data.icon && (
				<ListItemIcon>
					<Icon icon={data.icon} color={data.color} />
				</ListItemIcon>
			)}
			<ListItemText primary={data.name} />
			{edit && handleEdit && (
				<IconButton
					color="primary"
					onClick={(e) => {
						e.stopPropagation();
						handleEdit(data);
					}}
				>
					<IconPencil color={theme.palette.primary.main} />
				</IconButton>
			)}
		</ListItemButton>
	);
};
