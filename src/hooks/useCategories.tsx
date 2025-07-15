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

export interface CategoryItem {
	color?: string;
	icon?: string;
	id: string;
	name: string;
	section?: string;
	type: string;
}

export interface Categories {
	id: string;
	items: CategoryItem[];
	uid: string;
}

export const useCategories = (): UseQueryResult<CategoryItem[]> => {
	const auth = useAuth();
	const userId = auth.user?.uid || '';

	if (!userId) {
		throw new Error('User ID is required to fetch categories');
	}

	return useRealtimeQuery<CategoryItem[]>({
		queryKey: ['categories', userId],
		subscribeFn: (onData, onError) => {
			const unsubscribe = onSnapshot(
				query(
					collection(db, 'categories') as CollectionReference<Categories>,
					where('uid', '==', userId)
				),
				(querySnapshot: QuerySnapshot<DocumentData>) => {
					try {
						const updatedCategories = querySnapshot.docs.map(
							(doc: QueryDocumentSnapshot<DocumentData>) => ({
								...doc.data(),
								id: doc.id
							})
						) as Categories[];

						const items = updatedCategories[0]?.items ?? [];
						onData(items);
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
