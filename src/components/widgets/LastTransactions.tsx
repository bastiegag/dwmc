import { useState } from 'react';
import { List, Alert } from '@mui/material';
import dayjs from 'dayjs';

import { TransactionItem } from 'types';
import { useDataProvider } from 'hooks';
import { getCategory } from 'utils';
import { EmptyList, TransactionListItem, Loader } from 'components';
import { TransactionForm } from 'components/forms';

export const LastTransactions = () => {
	const { transactions, categories, isLoading, error } = useDataProvider();
	const [openDrawer, setOpenDrawer] = useState(false);
	const [formValues, setFormValues] = useState<
		Record<string, string | number | boolean>
	>({});

	// Handle loading state with multiple skeletons
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

	// Handle data state
	const handleEdit = (item: TransactionItem) => {
		console.log('Editing transaction:', item);
		// Ensure date is properly formatted before passing to form
		const dateValue = item.date ? item.date : dayjs().format('YYYY/MM/DD');

		const formattedValues = {
			id: item.id,
			type: item.type,
			amount: item.amount,
			date: dateValue,
			note: item.note || '',
			category: item.category,
			from: item.from || '',
			to: item.to || ''
		};

		console.log('Setting form values:', formattedValues);
		setFormValues(formattedValues);
		setOpenDrawer(true);
	};

	// Render transactions list
	let list;
	if (!transactions || !categories || transactions.length === 0) {
		list = <EmptyList message="No transactions found" />;
	} else {
		const transactionItems = transactions
			.slice(-3)
			.reverse()
			.map((item: TransactionItem) => {
				const category = getCategory(categories, item.category);

				return (
					<TransactionListItem
						key={item.id}
						item={item}
						category={category ?? null}
						handleEdit={handleEdit}
					/>
				);
			})
			.filter(Boolean);

		list =
			transactionItems.length > 0 ? (
				<>{transactionItems}</>
			) : (
				<EmptyList message="No transactions found" />
			);
	}

	return (
		<>
			<List component="nav" sx={{ mx: -2 }}>
				{list}
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
