import React, { useMemo, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { DataContext } from 'context';
import { useTransactions, useCategories } from 'hooks';
import { setColor } from 'utils';

export const DataProvider = ({
	children
}: React.PropsWithChildren<unknown>) => {
	const [user, setUser] = useState(getAuth().currentUser);

	// Listen for auth state changes
	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});

		// Clean up subscription
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

	const categories = cats && setColor(cats);
	const rawCategories = cats;

	const isLoading = transactionsLoading || categoriesLoading;
	const error = transactionsError || categoriesError;

	const value = useMemo(
		() => ({
			// Only provide data if user is logged in
			transactions: user ? transactions : undefined,
			categories: user ? categories : undefined,
			rawCategories: user ? rawCategories : undefined,
			isLoading: user ? isLoading : false,
			error: user ? error : null
		}),
		[user, transactions, categories, rawCategories, isLoading, error]
	);

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
