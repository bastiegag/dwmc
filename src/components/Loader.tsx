import { Box, CircularProgress } from '@mui/material';

interface LoaderProps {
	loading?: boolean;
}

export const Loader = ({ loading }: LoaderProps) => {
	return (
		loading && (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<CircularProgress />
			</Box>
		)
	);
};
