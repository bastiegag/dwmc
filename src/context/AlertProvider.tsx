import React, { useEffect, useMemo, useState } from 'react';

import { IAlertContext, AlertContext } from 'context';

export const AlertProvider = ({
	children
}: React.PropsWithChildren<unknown>) => {
	const [alert, setAlert] = useState<IAlertContext['alert']>({
		open: false,
		type: 'error',
		code: '',
		message: ''
	});
	const value = useMemo(() => ({ alert, setAlert }), [alert]);

	const getMessage = (code: string) => {
		switch (code) {
			case 'auth/invalid-login-credentials':
			case 'auth/invalid-credential':
				return "Le nom d'utilisateur et/ou le mot de passe ne sont pas valide.";
			case 'auth/missing-password':
				return "Le mot de passe n'est pas valide.";
			case 'auth/invalid-email':
				return "Le courriel n'est pas valide.";
			case 'auth/email-already-in-use':
				return 'Le courriel est déjà utilisé.';
			case 'auth/too-many-requests':
				return "L'accès à ce compte a été temporairement désactivé en raison de nombreuses tentatives de connexion infructueuses.";
			default:
				return 'Oops, something went wrong.';
		}
	};

	useEffect(() => {
		if (alert.code)
			setAlert({
				open: alert.open,
				type: alert.type,
				code: alert.code,
				message: getMessage(alert.code)
			});
	}, [alert.code, alert.open, alert.type]);

	return (
		<AlertContext.Provider value={value}>{children}</AlertContext.Provider>
	);
};
