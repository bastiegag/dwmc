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
import { Category, CategoryItem } from 'types';
import { useAuth, useRealtimeQuery } from 'hooks';

export const useCategories = (): UseQueryResult<CategoryItem[]> => {
	const { user } = useAuth();
	const userId = user?.uid;

	return useRealtimeQuery<CategoryItem[]>({
		queryKey: ['categories', userId],
		initialData: [], // Return empty array by default
		subscribeFn: (onData, onError) => {
			// If no user is logged in, return a noop function
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
