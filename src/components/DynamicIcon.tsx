import type { ComponentType, LazyExoticComponent } from 'react';
import { lazy, Suspense, memo } from 'react';
import { CircularProgress } from '@mui/material';

const iconCache: Record<
	string,
	LazyExoticComponent<ComponentType<unknown>>
> = {};

interface DynamicIconProps {
	iconName: string;
}

export const DynamicIcon = memo(({ iconName }: DynamicIconProps) => {
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
						)) as ComponentType<unknown>
					};
				}
				return { default: Icon as ComponentType<unknown> };
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
