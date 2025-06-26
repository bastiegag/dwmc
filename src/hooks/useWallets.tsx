import {
	collection,
	query,
	onSnapshot,
	where,
	CollectionReference,
	QuerySnapshot
} from 'firebase/firestore';
import { UseQueryResult } from '@tanstack/react-query';

import { db } from '../main';
import { useAuth, useRealtimeQuery } from 'hooks';

export interface Wallet {
	amount: number;
	id: string;
	icon: string;
	name: string;
	goal: number;
	color: string;
}

export interface Wallets {
	id: string;
	wallets: Wallet[];
	uid: string;
}

export interface WalletsItem {
	wallets: Wallet[];
}

export const useWallets = (): UseQueryResult<WalletsItem | null> => {
	const auth = useAuth();
	const userId = auth.user?.uid || '';

	if (!userId) {
		throw new Error('User ID is required to fetch categories');
	}

	return useRealtimeQuery<WalletsItem | null>({
		queryKey: ['wallets', userId],
		subscribeFn: (onData, onError) => {
			const unsubscribe = onSnapshot(
				query(
					collection(db, 'wallets') as CollectionReference<Wallets>,
					where('uid', '==', userId)
				),
				(querySnapshot: QuerySnapshot<Wallets>) => {
					try {
						const doc = querySnapshot.docs[0];
						if (!doc) {
							onData(null);
							return;
						}
						const walletsData = doc.data();
						const walletsItem: WalletsItem = {
							wallets: walletsData.wallets
						};
						onData(walletsItem);
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
