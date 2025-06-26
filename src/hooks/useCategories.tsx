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
import { useAuth, useRealtimeQuery } from 'hooks';
import { getSetColor } from 'utils';

export interface PrimaryCategories {
	color: string;
	id: string;
	name: string;
}

export interface SecondaryCategories {
	id: string;
	icon: string;
	name: string;
	section: string;
	color?: string;
}

export interface Categories {
	id: string;
	primary: PrimaryCategories[];
	secondary: SecondaryCategories[];
	uid: string;
}

export interface CategoriesItem {
	primary: PrimaryCategories[];
	secondary: SecondaryCategories[];
}

export const useCategories = (): UseQueryResult<CategoriesItem> => {
	const auth = useAuth();
	const userId = auth.user?.uid || '';

	if (!userId) {
		throw new Error('User ID is required to fetch categories');
	}

	return useRealtimeQuery<CategoriesItem>({
		queryKey: ['categories', userId],
		subscribeFn: (onData, onError) => {
			const unsubscribe = onSnapshot(
				query(
					collection(db, 'categories') as CollectionReference<Categories>,
					where('uid', '==', userId)
				),
				(querySnapshot: QuerySnapshot<Categories>) => {
					try {
						const updatedCategories = querySnapshot.docs.map(
							(doc: QueryDocumentSnapshot<Categories>) => ({
								...doc.data(),
								id: doc.id
							})
						);
						onData(getSetColor(updatedCategories));
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
