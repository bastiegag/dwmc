import { DateContext, DateProvider } from 'context';
import { useContextWrapper } from 'hooks';

export const useDate = () =>
	useContextWrapper(DateContext, {
		contextName: useDate.name,
		providerName: DateProvider.name
	});
