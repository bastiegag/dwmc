import { useState } from 'react';
import { List, Alert } from '@mui/material';
import dayjs from 'dayjs';

import { TransactionItem } from 'types';
import { useDataProvider } from 'hooks';
import { getCategory } from 'utils';
import { EmptyList, TransactionListItem, Loader } from 'components';
import { TransactionForm } from 'components/forms';

export const TransactionsList = () => {
	const { transactions, categories, isLoading, error } = useDataProvider();
	const [openDrawer, setOpenDrawer] = useState(false);
	const [formValues, setFormValues] = useState<Partial<TransactionItem>>({});

	if (isLoading) {
		return <Loader loading={true} />;
	}

	if (error) {
		return (
			<Alert severity="error">
				Error loading transactions:{' '}
				{error instanceof Error ? error.message : 'Unknown error'}
			</Alert>
		);
	}

	const handleEdit = (item: TransactionItem) => {
		const dateValue = item.date || dayjs().format('YYYY/MM/DD');

		setFormValues({
			...item,
			date: dateValue,
			note: item.note || '',
			from: item.from || '',
			to: item.to || ''
		});
		setOpenDrawer(true);
	};

	const renderTransactionsList = () => {
		if (!transactions || !categories || transactions.length === 0) {
			return <EmptyList message="No transactions found" />;
		}

		const transactionItems = [...transactions]
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
			});

		return transactionItems.length > 0 ? (
			<>{transactionItems}</>
		) : (
			<EmptyList message="No transactions found" />
		);
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
