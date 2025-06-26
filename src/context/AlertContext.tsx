import { createContext } from 'react';

export interface IAlertContext {
	alert: {
		open: boolean;
		type: 'success' | 'info' | 'warning' | 'error';
		code?: string;
		message?: string;
	};
	setAlert: React.Dispatch<React.SetStateAction<IAlertContext['alert']>>;
}

export const AlertContext = createContext<IAlertContext | null>(null);
