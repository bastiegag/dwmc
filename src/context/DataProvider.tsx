import React, { useMemo } from 'react';

import { DataContext } from 'context';
import { useTransactions, useCategories } from 'hooks';

export const DataProvider = ({
	children
}: React.PropsWithChildren<unknown>) => {
	const { data: transactions, isLoading, error } = useTransactions();
	const { data: categories } = useCategories();

	const value = useMemo(
		() => ({
			transactions,
			categories,
			isLoading,
			error
		}),
		[transactions, categories, isLoading, error]
	);

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
