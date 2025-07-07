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
import { useAuth, useRealtimeQuery } from 'hooks';

export interface WalletItem {
	amount: number;
	color: string;
	goal: number;
	icon: string;
	id: string;
	name: string;
}

export interface Wallets {
	id: string;
	items: WalletItem[];
	uid: string;
}

export const useWallets = (): UseQueryResult<WalletItem[] | null> => {
	const auth = useAuth();
	const userId = auth.user?.uid || '';

	if (!userId) {
		throw new Error('User ID is required to fetch wallets');
	}

	return useRealtimeQuery<WalletItem[] | null>({
		queryKey: ['wallets', userId],
		subscribeFn: (onData, onError) => {
			const unsubscribe = onSnapshot(
				query(
					collection(db, 'wallets') as CollectionReference<Wallets>,
					where('uid', '==', userId)
				),
				(querySnapshot: QuerySnapshot<DocumentData>) => {
					try {
						const updatedWallets = querySnapshot.docs.map(
							(doc: QueryDocumentSnapshot<DocumentData>) => ({
								...doc.data(),
								id: doc.id
							})
						) as Wallets[];

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
