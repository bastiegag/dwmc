import {
	collection,
	CollectionReference,
	DocumentData,
	onSnapshot,
	query,
	QueryDocumentSnapshot,
	QuerySnapshot,
	where
} from 'firebase/firestore';
import { UseQueryResult } from '@tanstack/react-query';

import { db } from '../main';
import { useAuth, useRealtimeQuery, useDate } from 'hooks';

export interface TransactionItem {
	amount: number;
	category: string;
	date: number;
	from?: string;
	id: string;
	note?: string;
	to?: string;
	type: number;
}

export interface Transactions {
	id: string;
	items: TransactionItem[];
	month: number;
	uid: string;
}

export const useTransactions = (): UseQueryResult<TransactionItem[]> => {
	const auth = useAuth();
	const userId = auth.user?.uid || '';
	const { selector } = useDate();

	if (!userId) {
		throw new Error('User ID is required to fetch transactions');
	}

	return useRealtimeQuery<TransactionItem[]>({
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
				(querySnapshot: QuerySnapshot<DocumentData>) => {
					try {
						const updatedTransactions = querySnapshot.docs.map(
							(doc: QueryDocumentSnapshot<DocumentData>) => ({
								...doc.data(),
								id: doc.id
							})
						) as Transactions[];

						onData(updatedTransactions[0]?.items || []);
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
