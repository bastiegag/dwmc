import { createContext } from 'react';

import type { DataContextType } from 'types';

export const DataContext = createContext<DataContextType>({
	transactions: undefined,
	categories: undefined,
	wallets: undefined,
	rawCategories: undefined,
	isLoading: false,
	error: null
});
