import { FC, lazy, Suspense, memo } from 'react';
import { CircularProgress } from '@mui/material';

const iconCache: Record<
	string,
	React.LazyExoticComponent<React.ComponentType<unknown>>
> = {};

export const DynamicIcon: FC<{ iconName: string }> = memo(({ iconName }) => {
	if (!iconName) return null;

	if (!iconCache[iconName]) {
		iconCache[iconName] = lazy(() =>
			import('./icons').then((module) => {
				const Icon = module[iconName as keyof typeof module];
				if (!Icon) {
					console.warn(`Icon "${iconName}" not found. Using fallback.`);
					return {
						default: (() => (
							<div style={{ width: 24, height: 24 }} />
						)) as React.ComponentType<unknown>
					};
				}
				return { default: Icon as React.ComponentType<unknown> };
			})
		);
	}

	const IconComponent = iconCache[iconName];

	return (
		<Suspense fallback={<CircularProgress size={16} color="inherit" />}>
			<IconComponent />
		</Suspense>
	);
});

DynamicIcon.displayName = 'DynamicIcon';
