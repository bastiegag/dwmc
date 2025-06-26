import { AlertContext, AlertProvider } from 'context';
import { useContextWrapper } from 'hooks';

export const useAlert = () =>
	useContextWrapper(AlertContext, {
		contextName: useAlert.name,
		providerName: AlertProvider.name
	});
