import React, { useMemo } from 'react';

import { DataContext } from 'context';
import { useTransactions, useCategories } from 'hooks';
import { setColor } from 'utils';

export const DataProvider = ({
	children
}: React.PropsWithChildren<unknown>) => {
	const {
		data: transactions,
		isLoading: transactionsLoading,
		error: transactionsError
	} = useTransactions();
	const {
		data: cats,
		isLoading: categoriesLoading,
		error: categoriesError
	} = useCategories();

	const categories = cats && setColor(cats);
	const rawCategories = cats;

	const isLoading = transactionsLoading || categoriesLoading;
	const error = transactionsError || categoriesError;

	const value = useMemo(
		() => ({
			transactions,
			categories,
			rawCategories,
			isLoading,
			error
		}),
		[transactions, categories, rawCategories, isLoading, error]
	);

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
