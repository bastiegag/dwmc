import { FC } from 'react';
import {
	Paper,
	Typography,
	CircularProgress,
	Alert,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	List
} from '@mui/material';

import { useTransactions, useCategories } from 'hooks';
import { Card, Icon } from 'components';
import { formatShortDate, formatPrice, getCategory } from 'utils';

export const TransactionsList: FC = () => {
	const { data: transactions, isLoading, error } = useTransactions();
	const { data: categories } = useCategories();

	if (error) {
		return (
			<Alert severity="error">
				Error loading transactions: {error.message}
			</Alert>
		);
	}

	if (isLoading) {
		return (
			<Paper
				elevation={0}
				sx={{ p: 3, display: 'flex', justifyContent: 'center' }}
			>
				<CircularProgress />
			</Paper>
		);
	}

	if (!transactions || transactions.length === 0) {
		return (
			<Paper elevation={0} sx={{ p: 3 }}>
				<Typography variant="body1" color="text.secondary">
					No transactions found.
				</Typography>
			</Paper>
		);
	}

	let list;
	if (categories) {
		list = transactions.map((item) => {
			const category = getCategory(categories, item.category);

			return (
				<ListItemButton key={item.id} sx={{ py: 1 }}>
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
							{formatShortDate(new Date())}
						</Typography>
					</Stack>
				</ListItemButton>
			);
		});
	}

	return (
		<Card>
			<List component="nav" sx={{ m: -2 }}>
				{list}
			</List>
		</Card>
	);
};
