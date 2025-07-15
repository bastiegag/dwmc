import React, { useMemo } from 'react';

import { DataContext } from 'context';
import { useTransactions, useCategories } from 'hooks';
import { setColor } from 'utils';

export const DataProvider = ({
	children
}: React.PropsWithChildren<unknown>) => {
	const { data: transactions, isLoading, error } = useTransactions();
	const { data: cats } = useCategories();

	const categories = cats && setColor(cats);
	const rawCategories = cats;

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
