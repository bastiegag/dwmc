import { doc, setDoc } from 'firebase/firestore';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';

import { db } from '../main';
import { useDate } from 'hooks';

type SetDocParams = {
	userId: string;
	data: Record<string, unknown>;
	collection: string;
};

export const useSetDoc = (): UseMutationResult<
	Record<string, unknown>,
	Error,
	SetDocParams
> => {
	const { month, year } = useDate();

	return useMutation({
		mutationFn: async ({ userId, data, collection }: SetDocParams) => {
			try {
				const docRef =
					collection === 'transactions'
						? doc(db, collection, userId, year.toString(), month.toString())
						: doc(db, collection, userId);

				await setDoc(docRef, data, { merge: true });

				return { ...data };
			} catch (error) {
				console.error('Error writing document:', error);
				throw error instanceof Error
					? error
					: new Error('Failed to write document to Firestore');
			}
		},
		onError: (error) => {
			console.error('Mutation failed:', error);
		}
	});
};
