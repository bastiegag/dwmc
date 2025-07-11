import { Alert, Typography } from '@mui/material';

import { Loader } from 'components';

interface EmptyProps {
	data: Record<string, string>[];
	name?: string;
	isLoading?: boolean;
	error?: Error | null;
}

export const Empty = ({
	data,
	name = 'results',
	isLoading,
	error,
	children
}: React.PropsWithChildren<EmptyProps>) => {
	if (error) {
		return (
			<Alert severity="error">
				Error loading {name}: {error.message}
			</Alert>
		);
	}

	if (isLoading) {
		return <Loader />;
	}

	if (!data || data.length === 0) {
		return (
			<Typography variant="body1" color="text.secondary">
				No {name} found
			</Typography>
		);
	}

	return children;
};
