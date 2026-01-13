import { useState, useCallback, useMemo, type PropsWithChildren } from 'react';

import type { AlertContextType } from 'types';
import { AlertContext } from 'context';

const getMessage = (code: string): string => {
	switch (code) {
		case 'auth/invalid-login-credentials':
		case 'auth/invalid-credential':
			return 'The username and/or password is not valid.';
		case 'auth/missing-password':
			return 'The password is not valid.';
		case 'auth/invalid-email':
			return 'The email is not valid.';
		case 'auth/email-already-in-use':
			return 'The email is already in use.';
		case 'auth/too-many-requests':
			return 'Access to this account has been temporarily disabled due to many failed login attempts.';
		default:
			return 'Oops, something went wrong.';
	}
};

export const AlertProvider = ({ children }: PropsWithChildren) => {
	const [alert, setAlert] = useState<AlertContextType['alert']>({
		open: false,
		type: 'error',
		code: '',
		message: ''
	});

	const setAlertWithMessage = useCallback(
		(
			type: 'success' | 'info' | 'warning' | 'error',
			message: string,
			code?: string
		) => {
			setAlert({
				open: true,
				type,
				code: code || '',
				message: code ? getMessage(code) : message
			});
		},
		[]
	);

	const value = useMemo(
		() => ({ alert, setAlert, setAlertWithMessage }),
		[alert, setAlertWithMessage]
	);

	return (
		<AlertContext.Provider value={value}>{children}</AlertContext.Provider>
	);
};
