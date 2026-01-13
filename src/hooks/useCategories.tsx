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
import type { Category, CategoryItem } from 'types';
import { useAuth, useRealtimeQuery } from 'hooks';

export const useCategories = (): UseQueryResult<CategoryItem[]> => {
	const { user } = useAuth();
	const userId = user?.uid;

	return useRealtimeQuery<CategoryItem[]>({
		queryKey: ['categories', userId],
		initialData: [],
		subscribeFn: (onData, onError) => {
			if (!userId) {
				onData([]);
				return () => {};
			}

			const unsubscribe = onSnapshot(
				query(
					collection(db, 'categories') as CollectionReference<Category>,
					where('uid', '==', userId)
				),
				(querySnapshot: QuerySnapshot<DocumentData>) => {
					try {
						const updatedCategories = querySnapshot.docs.map(
							(doc: QueryDocumentSnapshot<DocumentData>) => ({
								...doc.data(),
								id: doc.id
							})
						) as Category[];

						onData(updatedCategories[0]?.items || []);
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
