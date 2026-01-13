import { useState, useEffect, useMemo, type PropsWithChildren } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import type { AuthContextType } from 'types';
import { AuthContext } from 'context';

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const auth = getAuth();
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<AuthContextType['user'] | null>(null);
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
