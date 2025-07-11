// hooks/useUpdateTodo.ts
import { doc, setDoc } from 'firebase/firestore';
import { useMutation } from '@tanstack/react-query';

import { db } from '../main';

type SetDoc = {
	userId: string;
	data: Record<string, unknown>;
	collection: string;
	month?: number;
	year?: number;
};

export const useSetDoc = () => {
	return useMutation({
		mutationFn: async ({ userId, data, collection, month, year }: SetDoc) => {
			if (year && month) {
				await setDoc(
					doc(db, collection, userId, year.toString(), month.toString()),
					data,
					{ merge: true }
				);
			} else {
				await setDoc(doc(db, collection, userId), data);
			}
			return { ...data };
		}
	});
};
