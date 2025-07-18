// hooks/useSetDoc.tsx
import { doc, setDoc } from 'firebase/firestore';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { db } from '../main';

type SetDocParams = {
	userId: string;
	data: Record<string, unknown>;
	collection: string;
	month?: number;
	year?: number;
};

/**
 * Hook for creating or updating documents in Firestore
 * @returns Mutation hook for setting document data
 */
export const useSetDoc = (): UseMutationResult<
	Record<string, unknown>,
	Error,
	SetDocParams
> => {
	return useMutation({
		mutationFn: async ({
			userId,
			data,
			collection,
			month,
			year
		}: SetDocParams) => {
			try {
				console.log('Setting document:', {
					collection,
					userId,
					year,
					month,
					data
				});

				// Create document reference based on whether year/month are provided
				const docRef =
					year && month
						? doc(db, collection, userId, year.toString(), month.toString())
						: doc(db, collection, userId);

				// The setDoc function will create the document if it doesn't exist
				// when merge: true is specified
				await setDoc(docRef, data, { merge: true });
				console.log('Document successfully written!');

				return { ...data };
			} catch (error) {
				console.error('Error writing document:', error);
				throw error instanceof Error
					? error
					: new Error('Failed to write document to Firestore');
			}
		},
		// Optional: Add onError callback to handle errors
		onError: (error) => {
			console.error('Mutation failed:', error);
		}
	});
};
