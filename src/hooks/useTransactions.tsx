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
import { Transaction, TransactionItem } from 'types';
import { useAuth, useRealtimeQuery, useDate } from 'hooks';

export const useTransactions = (): UseQueryResult<TransactionItem[]> => {
	const { month, year } = useDate();
	const { user } = useAuth();
	const userId = user?.uid || '';

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
						year.toString()
					) as CollectionReference<Transaction>,
					where('uid', '==', userId),
					where('month', '==', month)
				),
				(querySnapshot: QuerySnapshot<DocumentData>) => {
					try {
						const updatedTransactions = querySnapshot.docs.map(
							(doc: QueryDocumentSnapshot<DocumentData>) => ({
								...doc.data(),
								id: doc.id
							})
						) as Transaction[];

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
