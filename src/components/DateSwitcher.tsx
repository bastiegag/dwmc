import { useCallback } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Paper, Typography, Stack, IconButton } from '@mui/material';
import { useDate } from 'hooks';

export const DateSwitcher = () => {
	const { current, setCurrent, label } = useDate();

	const handleDateChange = useCallback(
		(step: number) => {
			const newDate = new Date(current);
			newDate.setMonth(newDate.getMonth() + step);
			setCurrent(newDate);
		},
		[current, setCurrent]
	);

	return (
		<Paper
			elevation={0}
			sx={{
				p: 1,
				borderRadius: 8,
				mx: 2,
				position: 'sticky',
				transform: 'translateY(50%)'
			}}
		>
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<IconButton onClick={() => handleDateChange(-1)}>
					<IconChevronLeft />
				</IconButton>
				<Stack sx={{ textAlign: 'center' }}>
					<Typography>{label}</Typography>
				</Stack>
				<IconButton onClick={() => handleDateChange(1)}>
					<IconChevronRight />
				</IconButton>
			</Stack>
		</Paper>
	);
};
