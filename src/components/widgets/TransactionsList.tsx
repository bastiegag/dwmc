import { useCallback, useMemo, useState } from 'react';
import { List, Alert, ListSubheader, Paper } from '@mui/material';
import dayjs from 'dayjs';

import type { TransactionItem } from 'types';
import { useDataProvider } from 'hooks';
import { getCategory, formatDateTitle } from 'utils';
import { EmptyList, TransactionListItem, Loader } from 'components';
import { TransactionForm } from 'components/forms';

// Group transactions by day
type GroupedTransactions = {
	[day: string]: TransactionItem[];
};

export const TransactionsList = () => {
	const { transactions, categories, isLoading, error } = useDataProvider();
	const [openDrawer, setOpenDrawer] = useState(false);
	const [formValues, setFormValues] = useState<Partial<TransactionItem>>({});

	const handleEdit = useCallback((item: TransactionItem) => {
		setFormValues({
			id: item.id,
			type: item.type,
			amount: item.amount,
			date: item.date || dayjs().format('YYYY/MM/DD'),
			note: item.note || '',
			category: item.category,
			from: item.from || '',
			to: item.to || ''
		});
		setOpenDrawer(true);
	}, []);

	const groupedTransactions = useMemo(() => {
		if (!transactions || transactions.length === 0) return {};
		return transactions.reduce((groups: GroupedTransactions, transaction) => {
			const day = dayjs(transaction.date).format('YYYY-MM-DD');
			if (!groups[day]) groups[day] = [];
			groups[day].push(transaction);
			return groups;
		}, {});
	}, [transactions]);

	const sortedDays = useMemo(
		() =>
			Object.keys(groupedTransactions).sort((a, b) => dayjs(b).diff(dayjs(a))),
		[groupedTransactions]
	);

	if (isLoading) return <Loader loading />;
	if (error) {
		return (
			<Alert severity="error">
				Error loading transactions:{' '}
				{error instanceof Error ? error.message : 'Unknown error'}
			</Alert>
		);
	}

	return (
		<>
			<List component="nav" sx={{ mx: -2 }}>
				{!transactions ||
				!categories ||
				transactions.length === 0 ||
				sortedDays.length === 0 ? (
					<EmptyList message="No transactions found" />
				) : (
					sortedDays.map((day) => (
						<div key={day}>
							<ListSubheader
								component={Paper}
								elevation={0}
								sx={{
									backgroundColor: 'background.paper',
									my: 1,
									py: 1,
									px: 2,
									position: 'relative',
									borderRadius: 1
								}}
							>
								{formatDateTitle(day)}
							</ListSubheader>
							{groupedTransactions[day].map((item: TransactionItem) => (
								<TransactionListItem
									key={item.id}
									item={item}
									category={getCategory(categories ?? [], item.category)}
									handleEdit={handleEdit}
								/>
							))}
						</div>
					))
				)}
			</List>
			<TransactionForm
				open={openDrawer}
				setOpen={setOpenDrawer}
				title="Edit transaction"
				values={formValues}
			/>
		</>
	);
};
