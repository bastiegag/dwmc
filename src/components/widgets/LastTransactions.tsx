import { useCallback, useMemo, useState } from 'react';
import { List, Alert } from '@mui/material';
import dayjs from 'dayjs';

import type { TransactionItem } from 'types';
import { useDataProvider } from 'hooks';
import { getCategory } from 'utils';
import { EmptyList, TransactionListItem, Loader } from 'components';
import { TransactionForm } from 'components/forms';

export const LastTransactions = () => {
	const { transactions, categories, isLoading, error } = useDataProvider();
	const [openDrawer, setOpenDrawer] = useState(false);
	const [formValues, setFormValues] = useState<Record<string, string>>({});

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

	const lastThree = useMemo(() => {
		if (!transactions || !categories || transactions.length === 0) return null;
		return transactions.slice(-3).reverse();
	}, [transactions, categories]);

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
				{!lastThree || lastThree.length === 0 ? (
					<EmptyList message="No transactions found" />
				) : (
					lastThree.map((item: TransactionItem) => (
						<TransactionListItem
							key={item.id}
							item={item}
							category={getCategory(categories ?? [], item.category) ?? null}
							hasDate={true}
							handleEdit={handleEdit}
						/>
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
