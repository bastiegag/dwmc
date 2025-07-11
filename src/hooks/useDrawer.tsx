import { DrawerContext, DrawerProvider } from 'context';
import { useContextWrapper } from 'hooks';

export const useDrawer = () =>
	useContextWrapper(DrawerContext, {
		contextName: useDrawer.name,
		providerName: DrawerProvider.name
	});
