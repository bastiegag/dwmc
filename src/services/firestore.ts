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
	type SetOptions,
	type Unsubscribe,
	type QuerySnapshot,
	type DocumentData,
	type Firestore
} from 'firebase/firestore';

let firestoreInstance: Firestore | null = null;

const getFirestoreInstance = (): Firestore => {
	if (!firestoreInstance) {
		firestoreInstance = getFirestore();
	}
	return firestoreInstance;
};

export const getDocuments = (
	user: string,
	snapshot: (snapshot: QuerySnapshot<DocumentData>) => void,
	colRef: string
): Unsubscribe => {
	const db = getFirestoreInstance();
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
) => {
	const db = getFirestoreInstance();
	return addDoc(collection(db, 'users', user, colRef), data);
};

export const setDocument = async (
	data: DocumentData,
	user: string,
	docId: string,
	colRef: string,
	options?: SetOptions
) => {
	const db = getFirestoreInstance();
	return setDoc(doc(db, 'users', user, colRef, docId), data, options || {});
};

export const deleteDocument = async (
	user: string,
	docId: string,
	colRef: string
): Promise<void> => {
	const db = getFirestoreInstance();
	return deleteDoc(doc(db, 'users', user, colRef, docId));
};

export const createDefaultDocs = async (user: {
	uid: string;
}): Promise<void> => {
	const db = getFirestoreInstance();

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

	const documentPromises = Object.entries(defaults).flatMap(([colRef, docs]) =>
		Object.entries(docs).map(([docId, data]) =>
			setDocument(data, user.uid, docId, colRef)
		)
	);

	try {
		await Promise.all(documentPromises);
	} catch (error) {
		console.error('Error creating default documents:', error);
		throw error;
	}
};
