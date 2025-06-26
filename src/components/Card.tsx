import React from 'react';
import { Paper, Typography } from '@mui/material';

interface ICardProps {
	primary?: string;
	secondary?: string;
}

export const Card = ({
	primary,
	secondary,
	children
}: React.PropsWithChildren<ICardProps>) => {
	return (
		<Paper elevation={0} sx={{ mx: 2, p: 2, overflow: 'hidden' }}>
			{primary && <Typography variant="h6">{primary}</Typography>}
			{secondary && <Typography variant="caption">{secondary}</Typography>}
			{children}
		</Paper>
	);
};
