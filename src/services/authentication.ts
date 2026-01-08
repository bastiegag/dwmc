import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	getAdditionalUserInfo,
	signOut,
	type Auth
} from 'firebase/auth';

let authInstance: Auth | null = null;

const getAuthInstance = (): Auth => {
	if (!authInstance) {
		authInstance = getAuth();
	}
	return authInstance;
};

export const login = async (email: string, password: string) => {
	const auth = getAuthInstance();
	const result = await signInWithEmailAndPassword(auth, email, password);
	const additionalUserInfo = getAdditionalUserInfo(result);

	if (import.meta.env.DEV) {
		console.log('New user:', additionalUserInfo?.isNewUser);
	}

	return result;
};

export const signUp = async (email: string, password: string) => {
	const auth = getAuthInstance();
	const result = await createUserWithEmailAndPassword(auth, email, password);
	const additionalUserInfo = getAdditionalUserInfo(result);

	if (import.meta.env.DEV) {
		console.log('New user:', additionalUserInfo?.isNewUser);
	}

	return result;
};

export const logout = async () => {
	const auth = getAuthInstance();
	await signOut(auth);
};
