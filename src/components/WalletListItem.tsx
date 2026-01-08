import { memo } from 'react';
import { Stack, Divider, Typography, Box, LinearProgress } from '@mui/material';

import type { WalletItem } from 'types';
import { Card, Icon, Price } from 'components';

interface WalletListItemProps {
	item: WalletItem;
	handleEdit: (item: WalletItem) => void;
}

export const WalletListItem = memo(
	({ item, handleEdit }: WalletListItemProps) => {
		const goal = Number(item.goal);
		const percent = Number((Number(item.amount) / goal) * 100);

		return (
			<Card secondary={item.name} onClick={() => handleEdit(item)}>
				<Stack
					direction="row"
					spacing={2}
					alignItems="center"
					justifyContent="space-between"
				>
					<Price value={Number(item.amount)} styled={true} />
					<Icon icon={item.icon} color={item.color} round={false} />
				</Stack>
				{goal > 0 && (
					<>
						<Divider sx={{ opacity: 0.1, my: 3 }} />
						<Stack
							direction="row"
							spacing={2}
							alignItems="center"
							justifyContent="space-between"
						>
							<Typography variant="caption" color="text.secondary">
								Savings goal
							</Typography>
							<Price value={goal} />
						</Stack>
						<Box sx={{ width: '100%', mt: 1 }}>
							<LinearProgress variant="determinate" value={percent} />
						</Box>
					</>
				)}
			</Card>
		);
	}
);

WalletListItem.displayName = 'WalletListItem';
