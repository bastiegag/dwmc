import { useState, useMemo } from 'react';
import { List, Alert, ListSubheader, Paper } from '@mui/material';
import dayjs from 'dayjs';

import { TransactionItem } from 'types';
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

	// Group transactions by day using a memoized value to avoid recalculating on every render
	const groupedTransactions = useMemo(() => {
		if (!transactions || transactions.length === 0) {
			return {};
		}

		// Create a copy to avoid mutating the original array
		return [...transactions].reduce(
			(groups: GroupedTransactions, transaction) => {
				// Get date in YYYY-MM-DD format as the group key
				const day = dayjs(transaction.date).format('YYYY-MM-DD');

				if (!groups[day]) {
					groups[day] = [];
				}

				groups[day].push(transaction);
				return groups;
			},
			{}
		);
	}, [transactions]);

	// Handle loading state
	if (isLoading) {
		return <Loader loading={true} />;
	}

	// Handle error state
	if (error) {
		return (
			<Alert severity="error">
				Error loading transactions:{' '}
				{error instanceof Error ? error.message : 'Unknown error'}
			</Alert>
		);
	}

	// Handle edit transaction
	const handleEdit = (item: TransactionItem) => {
		const dateValue = item.date || dayjs().format('YYYY/MM/DD');

		setFormValues({
			id: item.id,
			type: item.type,
			amount: item.amount,
			date: dateValue,
			note: item.note || '',
			category: item.category,
			from: item.from || '',
			to: item.to || ''
		});
		setOpenDrawer(true);
	};

	// Render transactions grouped by day
	const renderTransactionsList = () => {
		if (!transactions || !categories || transactions.length === 0) {
			return <EmptyList message="No transactions found" />;
		}

		// Sort days in descending order (newest first)
		const sortedDays = Object.keys(groupedTransactions).sort((a, b) =>
			dayjs(b).diff(dayjs(a))
		);

		if (sortedDays.length === 0) {
			return <EmptyList message="No transactions found" />;
		}

		return sortedDays.map((day) => (
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

				{groupedTransactions[day].map((item: TransactionItem) => {
					const category = getCategory(categories, item.category);
					return (
						<TransactionListItem
							key={item.id}
							item={item}
							category={category}
							handleEdit={handleEdit}
						/>
					);
				})}
			</div>
		));
	};

	return (
		<>
			<List component="nav" sx={{ mx: -2 }}>
				{renderTransactionsList()}
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
