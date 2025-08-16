import {
	getFirestore,
	collection,
	query,
	onSnapshot,
	where,
	addDoc,
	doc,
	setDoc,
	deleteDoc,
	SetOptions
} from 'firebase/firestore';
import { Unsubscribe, QuerySnapshot, DocumentData } from 'firebase/firestore';

export const getDocuments = (
	user: string,
	snapshot: (snapshot: QuerySnapshot<DocumentData>) => void,
	colRef: string
): Unsubscribe => {
	const db = getFirestore();
	const q = query(
		collection(db, 'users', user, colRef),
		where('uid', '==', user)
	);

	return onSnapshot(q, snapshot);
};

export const addDocument = async (
	data: DocumentData,
	user: string,
	colRef: string
): Promise<ReturnType<typeof addDoc>> => {
	const db = getFirestore();

	return await addDoc(collection(db, 'users', user, colRef), data);
};

export const setDocument = async (
	data: DocumentData,
	user: string,
	docId: string,
	colRef: string,
	options?: SetOptions
): Promise<ReturnType<typeof setDoc>> => {
	const db = getFirestore();
	if (options) {
		return await setDoc(doc(db, 'users', user, colRef, docId), data, options);
	} else {
		return await setDoc(doc(db, 'users', user, colRef, docId), data);
	}
};

export const deleteDocument = async (
	user: string,
	docId: string,
	colRef: string
): Promise<void> => {
	const db = getFirestore();

	return await deleteDoc(doc(db, 'users', user, colRef, docId));
};

export const createDefaultDocs = async (user: {
	uid: string;
}): Promise<void> => {
	const db = getFirestore();

	const defaults = {
		categories: {
			default: {
				color: 'grey.200',
				name: 'Divers',
				type: 0,
				uid: user.uid
			},
			subdefault: {
				icon: 'IconArchive',
				name: 'Divers',
				section: 'default',
				type: 1,
				uid: user.uid
			}
		},
		wallets: {
			default: {
				amount: 0,
				color: 'color.blue',
				goal: '',
				icon: 'IconCash',
				name: 'Compte chèque',
				uid: user.uid
			}
		}
	};

	await setDoc(doc(db, 'users', user.uid), { uid: user.uid });

	for (const [colRef, docs] of Object.entries(defaults)) {
		for (const [docId, data] of Object.entries(docs)) {
			setDocument(data, user.uid, docId, colRef)
				.then(() => {})
				.catch((error) => {
					console.log(error);
				});
		}
	}
};
