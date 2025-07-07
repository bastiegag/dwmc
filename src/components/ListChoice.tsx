import { FC } from 'react';
import {
	IconButton,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from '@mui/material';

import { Icon } from 'components';

interface ListChoiceProps {
	data: {
		id: string;
		name?: string;
		icon?: string;
		color?: string;
	};
	selected: boolean;
	small?: boolean;
	handleClose: (value: string, label?: string) => void;
}

export const ListChoice: FC<ListChoiceProps> = ({
	data,
	selected,
	small,
	handleClose
}) => {
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
		</ListItemButton>
	);
};
