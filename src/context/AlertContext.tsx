import { createContext } from 'react';

import type { AlertContextType } from 'types';

export const AlertContext = createContext<AlertContextType>({
	alert: { open: false, type: 'error', code: '', message: '' },
	setAlert: () => {},
	setAlertWithMessage: () => {}
});
