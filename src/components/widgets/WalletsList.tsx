import { useCallback, useState } from 'react';
import { Alert, Stack } from '@mui/material';

import type { WalletItem } from 'types';
import { useDataProvider } from 'hooks';
import { EmptyList, WalletListItem, Loader } from 'components';
import { WalletForm } from 'components/forms';

export const WalletsList = () => {
	const { wallets, isLoading, error } = useDataProvider();
	const [openDrawer, setOpenDrawer] = useState(false);
	const [formValues, setFormValues] = useState<Record<string, string>>({});

	const handleEdit = useCallback((item: WalletItem) => {
		const formattedValues = {
			id: item.id,
			amount: item.amount,
			name: item.name,
			color: item.color,
			icon: item.icon,
			goal: item.goal
		};

		setFormValues(formattedValues);
		setOpenDrawer(true);
	}, []);

	let listContent;
	if (!wallets || wallets.length === 0) {
		listContent = <EmptyList message="No wallets found" />;
	} else {
		const walletItems = [...wallets]
			.reverse()
			.map((item: WalletItem) => (
				<WalletListItem key={item.id} item={item} handleEdit={handleEdit} />
			));
		listContent =
			walletItems.length > 0 ? (
				walletItems
			) : (
				<EmptyList message="No wallets found" />
			);
	}

	if (isLoading) return <Loader loading />;
	if (error) {
		return (
			<Alert severity="error">
				Error loading wallets:{' '}
				{error instanceof Error ? error.message : 'Unknown error'}
			</Alert>
		);
	}

	return (
		<>
			<Stack spacing={2}>{listContent}</Stack>
			<WalletForm
				open={openDrawer}
				setOpen={setOpenDrawer}
				title="Edit wallet"
				values={formValues}
			/>
		</>
	);
};
