import {
	collection,
	CollectionReference,
	onSnapshot,
	query,
	QueryDocumentSnapshot,
	QuerySnapshot,
	where,
	type DocumentData
} from 'firebase/firestore';
import type { UseQueryResult } from '@tanstack/react-query';

import { db } from '../main';
import type { Wallet, WalletItem } from 'types';
import { useAuth, useRealtimeQuery } from 'hooks';

export const useWallets = (): UseQueryResult<WalletItem[]> => {
	const auth = useAuth();
	const userId = auth.user?.uid || '';

	return useRealtimeQuery<WalletItem[]>({
		queryKey: ['wallets', userId],
		initialData: [],
		subscribeFn: (onData, onError) => {
			const unsubscribe = onSnapshot(
				query(
					collection(db, 'wallets') as CollectionReference<Wallet>,
					where('uid', '==', userId)
				),
				(querySnapshot: QuerySnapshot<DocumentData>) => {
					try {
						const updatedWallets = querySnapshot.docs.map(
							(doc: QueryDocumentSnapshot<DocumentData>) => ({
								...doc.data(),
								id: doc.id
							})
						) as Wallet[];

						onData(updatedWallets[0]?.items || []);
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
