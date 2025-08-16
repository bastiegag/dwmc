import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	getAdditionalUserInfo,
	signOut
} from 'firebase/auth';

export const login = (email: string, password: string) => {
	const auth = getAuth();

	return signInWithEmailAndPassword(auth, email, password)
		.then((result) => {
			const additionalUserInfo = getAdditionalUserInfo(result);

			console.log(additionalUserInfo?.isNewUser);
		})
		.catch((error) => {
			throw error;
		});
};

export const signUp = (email: string, password: string) => {
	const auth = getAuth();

	return createUserWithEmailAndPassword(auth, email, password)
		.then((result) => {
			const additionalUserInfo = getAdditionalUserInfo(result);

			console.log(additionalUserInfo?.isNewUser);
		})
		.catch((error) => {
			throw error;
		});
};

export const logout = () => {
	const auth = getAuth();

	return signOut(auth)
		.then(() => {})
		.catch((error) => {
			throw error;
		});
};
