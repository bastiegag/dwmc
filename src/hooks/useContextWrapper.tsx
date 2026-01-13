import { useContext, type Context } from 'react';

export const useContextWrapper = <T,>(
	ReactContext: Context<T>,
	config: { contextName: string; providerName: string }
): T => {
	const context = useContext(ReactContext);
	if (!context) {
		throw new Error(
			`${config.contextName} must be used within a ${config.providerName}`
		);
	}
	return context;
};
