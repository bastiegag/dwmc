import { DataContext, DataProvider } from 'context';
import { useContextWrapper } from 'hooks';

export const useDataProvider = () =>
	useContextWrapper(DataContext, {
		contextName: useDataProvider.name,
		providerName: DataProvider.name
	});
