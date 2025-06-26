import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';

import { db } from '../main';
import { useAuth } from 'hooks';

export interface Categories {
	id: string;
	primary: {
		id: string;
		color: string;
		name: string;
	}[];
	secondary: {
		id: string;
		icon: string;
		section: string;
		name: string;
	}[];
	uid: string;
}

const fetchDoc = async (
	userId: string,
	catId: string
): Promise<DocumentData | null> => {
	const docRef = doc(db, 'categories', userId);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const categories = docSnap.data() as Categories;
		const defaultCategory = categories.secondary.find(
			(cat) => cat.id === 'default'
		);

		if (catId) {
			const secondaryCategory = categories.secondary.find(
				(cat) => cat.id === catId
			);

			if (secondaryCategory) {
				return { category: secondaryCategory, categories };
			}
		}

		return {
			category: defaultCategory,
			categories
		};
	} else {
		return null;
	}
};

export const useCategories = (catId: string = 'default') => {
	const auth = useAuth();
	const userId = auth.user?.uid || '';

	if (!userId) {
		throw new Error('User ID is required to fetch categories');
	}

	const output = useQuery({
		queryKey: ['categories', userId],
		queryFn: () => fetchDoc(userId, catId),
		enabled: !!userId // Ensure userId is defined before fetching
	});

	return {
		category: output.data?.category,
		categories: output.data?.categories,
		isLoading: output.isLoading,
		error: output.error
	};
};
