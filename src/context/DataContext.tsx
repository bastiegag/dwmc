import { createContext } from 'react';

import { TransactionItem, CategoryItem } from 'hooks';

export interface IDataContext {
	transactions: TransactionItem[] | undefined;
	categories: CategoryItem[] | undefined;
	isLoading: boolean;
	error: Error | null;
}

export const DataContext = createContext<IDataContext | null>(null);
