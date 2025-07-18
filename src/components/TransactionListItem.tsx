import { FC } from 'react';
import {
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	Typography
} from '@mui/material';

import { TransactionItem, CategoryItem } from 'types';
import { formatShortDate } from 'utils';
import { Icon, Price } from 'components';

interface TransactionListItemProps {
	item: TransactionItem;
	category: CategoryItem | null;
	handleEdit: (item: TransactionItem) => void;
}

export const TransactionListItem: FC<TransactionListItemProps> = ({
	item,
	category,
	handleEdit
}) => {
	return (
		<ListItemButton onClick={() => handleEdit(item)} sx={{ py: 1 }}>
			<ListItemIcon>
				<Icon icon={category?.icon} color={category?.color} />
			</ListItemIcon>
			<ListItemText
				primary={item.note || category?.name}
				secondary={item.note && category?.name}
			/>
			<Stack sx={{ textAlign: 'right' }}>
				<Price value={item.amount} styled={true} type={item.type} />
				<Typography
					color="grey.400"
					variant="caption"
					sx={{ lineHeight: 1, mt: 0.5 }}
				>
					{formatShortDate(item.date)}
				</Typography>
			</Stack>
		</ListItemButton>
	);
};
