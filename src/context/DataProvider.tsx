import { useMemo, useState, useEffect, type PropsWithChildren } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { DataContext } from 'context';
import { useTransactions, useCategories, useWallets } from 'hooks';
import { setColor } from 'utils';

export const DataProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState(getAuth().currentUser);

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});

		return () => unsubscribe();
	}, []);

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

	const {
		data: wallets,
		isLoading: walletsLoading,
		error: walletsError
	} = useWallets();

	const categories = cats && setColor(cats);
	const rawCategories = cats;

	const isLoading = transactionsLoading || categoriesLoading || walletsLoading;
	const error = transactionsError || categoriesError || walletsError;

	const value = useMemo(
		() => ({
			transactions: user ? transactions : undefined,
			categories: user ? categories : undefined,
			wallets: user ? wallets : undefined,
			rawCategories: user ? rawCategories : undefined,
			isLoading: user ? isLoading : false,
			error: user ? error : null
		}),
		[user, transactions, categories, wallets, rawCategories, isLoading, error]
	);

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
