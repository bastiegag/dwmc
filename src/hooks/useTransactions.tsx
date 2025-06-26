import {
	collection,
	query,
	onSnapshot,
	where,
	CollectionReference,
	QuerySnapshot,
	QueryDocumentSnapshot
} from 'firebase/firestore';
import { UseQueryResult } from '@tanstack/react-query';

import { db } from '../main';
import { useAuth, useRealtimeQuery, useDate } from 'hooks';

export interface Transactions {
	id: string;
	expenses: {
		id: string;
		amount: number;
		category: string;
		from: string;
		note: string;
		date: number;
	}[];
	incomes: {
		id: string;
		amount: number;
		category: string;
		to: string;
		note: string;
		date: number;
	}[];
	transfers: {
		id: string;
		amount: number;
		category: string;
		from: string;
		to: string;
		note: string;
		date: number;
	}[];
	month: number;
	uid: string;
}

export const useTransactions = (): UseQueryResult<TransactionsItem[]> => {
	const auth = useAuth();
	const userId = auth.user?.uid || '';
	const { selector } = useDate();

	if (!userId) {
		throw new Error('User ID is required to fetch transactions');
	}

	return useRealtimeQuery<TransactionsItem[]>({
		queryKey: ['transactions', userId],
		subscribeFn: (onData, onError) => {
			const unsubscribe = onSnapshot(
				query(
					collection(
						db,
						'transactions',
						userId,
						'2025'
					) as CollectionReference<Transactions>,
					where('uid', '==', userId),
					where('month', '==', selector)
				),
				(querySnapshot: QuerySnapshot<Transactions>) => {
					try {
						const updatedTransactions = querySnapshot.docs.map(
							(doc: QueryDocumentSnapshot<Transactions>) => ({
								...doc.data(),
								id: doc.id
							})
						);
						onData(groupAndSort(updatedTransactions));
					} catch (error) {
						onError(error);
					}
				},
				onError
			);
			return unsubscribe;
		}
	});
};

interface TransactionsItem {
	id: string;
	amount: number;
	category: string;
	from?: string;
	to?: string;
	note: string;
	date: number;
	type: number; // 0 for expenses, 1 for incomes, 2 for transfers
}

const groupAndSort = (data: Transactions[]): TransactionsItem[] => {
	const output: TransactionsItem[] = [];

	data.forEach((month) => {
		const expenses = month.expenses.map(
			(expense): TransactionsItem => ({
				...expense,
				type: 0
			})
		);

		const incomes = month.incomes.map(
			(income): TransactionsItem => ({
				...income,
				type: 1
			})
		);

		const transfers = month.transfers.map(
			(transfer): TransactionsItem => ({
				...transfer,
				type: 2
			})
		);

		output.push(...expenses, ...incomes, ...transfers);
	});

	// Sort by date, most recent first
	return output.sort((a, b) => b.date - a.date);
};
