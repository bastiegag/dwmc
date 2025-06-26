import { useState, useEffect, useMemo } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { IAuthContext, AuthContext } from 'context';

export const AuthProvider = ({
	children
}: React.PropsWithChildren<unknown>) => {
	const auth = getAuth();
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<IAuthContext['user']>(null);
	const value = useMemo(() => ({ user, setUser }), [user]);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);

			return unsubscribe;
		});
	});

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
