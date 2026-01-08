import { Box, Paper, Typography } from '@mui/material';

interface CardProps {
	primary?: string;
	secondary?: string;
	onClick?: () => void;
	children?: React.ReactNode;
}

export const Card = ({ primary, secondary, onClick, children }: CardProps) => (
	<Paper elevation={0} onClick={onClick} sx={{ p: 2, overflow: 'hidden' }}>
		{primary && <Typography variant="h6">{primary}</Typography>}
		{secondary && <Typography variant="caption">{secondary}</Typography>}
		<Box>{children}</Box>
	</Paper>
);
