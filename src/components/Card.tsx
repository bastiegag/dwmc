import { Box, Paper, Typography } from '@mui/material';

interface CardProps {
	primary?: string;
	secondary?: string;
}

export const Card = ({
	primary,
	secondary,
	children
}: React.PropsWithChildren<CardProps>) => {
	return (
		<Paper elevation={0} sx={{ p: 2, overflow: 'hidden' }}>
			{primary && <Typography variant="h6">{primary}</Typography>}
			{secondary && <Typography variant="caption">{secondary}</Typography>}
			<Box sx={{ mt: 2 }}>{children}</Box>
		</Paper>
	);
};
