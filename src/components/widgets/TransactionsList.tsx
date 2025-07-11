import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	Typography
} from '@mui/material';

import { TransactionItem, useDrawer, useDataProvider } from 'hooks';
import { Icon } from 'components';
import { formatShortDate, formatPrice, getCategory } from 'utils';

export const TransactionsList = () => {
	const { transactions, categories } = useDataProvider();
	const { dispatchDrawer } = useDrawer();

	let list;
	if (transactions && categories) {
		const handleEdit = (item: TransactionItem) => {
			dispatchDrawer({
				type: 'edit-transaction',
				title: 'Edit transaction',
				values: { ...item }
			});
		};

		list = transactions.map((item) => {
			const category = getCategory(categories, item.category);

			return (
				<ListItemButton
					key={item.id}
					onClick={() => handleEdit(item)}
					sx={{ py: 1 }}
				>
					<ListItemIcon>
						<Icon icon={category?.icon} color={category?.color} />
					</ListItemIcon>
					<ListItemText
						primary={item.note || category?.name}
						secondary={item.note && category?.name}
					/>
					<Stack sx={{ textAlign: 'right' }}>
						<Typography color="inherit" sx={{ lineHeight: 1 }}>
							{formatPrice(item.amount)}
						</Typography>
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
		});
	}

	return (
		<List component="nav" sx={{ m: -2 }}>
			{list}
		</List>
	);
};
