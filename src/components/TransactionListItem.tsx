import { memo } from 'react';
import {
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	Typography
} from '@mui/material';

import type { TransactionItem, CategoryItem } from 'types';
import { formatShortDate } from 'utils';
import { Icon, Price } from 'components';

interface TransactionListItemProps {
	item: TransactionItem;
	category: CategoryItem | null | undefined;
	hasDate?: boolean;
	handleEdit: (item: TransactionItem) => void;
}

export const TransactionListItem = memo(
	({ item, category, hasDate, handleEdit }: TransactionListItemProps) => {
		const primaryText = item.note || category?.name || '';
		const secondaryText =
			item.note && category?.name ? category.name : undefined;

		return (
			<ListItemButton onClick={() => handleEdit(item)} sx={{ py: 1 }}>
				<ListItemIcon>
					<Icon icon={category?.icon} color={category?.color} />
				</ListItemIcon>
				<ListItemText primary={primaryText} secondary={secondaryText} />
				<Stack sx={{ textAlign: 'right' }}>
					<Price value={Number(item.amount)} styled={true} type={item.type} />
					{hasDate && (
						<Typography
							color="text.secondary"
							variant="caption"
							sx={{ lineHeight: 1, mt: 0.5 }}
						>
							{formatShortDate(item.date)}
						</Typography>
					)}
				</Stack>
			</ListItemButton>
		);
	}
);

TransactionListItem.displayName = 'TransactionListItem';
