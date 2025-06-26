import { AuthContext, AuthProvider } from 'context';
import { useContextWrapper } from 'hooks';

export const useAuth = () =>
	useContextWrapper(AuthContext, {
		contextName: useAuth.name,
		providerName: AuthProvider.name
	});
