import React, { useState } from 'react';
import { Box, Tab, Tabs, Stack } from '@mui/material';

import { DateSwitcher, Card, AddButton } from 'components';
import { TransactionForm } from 'components/forms';
import { TransactionsList } from 'components/widgets';

export const Home = () => {
	const [tab, setTab] = useState(0);
	const [openDrawer, setOpenDrawer] = useState(false);

	const handleChangeTab = (event: React.SyntheticEvent, newTab: number) => {
		event.preventDefault();

		setTab(newTab);
	};

	const handleAddTransaction = () => {
		setOpenDrawer(true);
	};

	return (
		<>
			<Box
				sx={{
					backgroundColor: 'primary.main',
					zIndex: 2,
					position: 'relative'
				}}
			>
				<Tabs
					value={tab}
					onChange={handleChangeTab}
					textColor="inherit"
					centered
				>
					<Tab disableRipple label="Aperçu" />
					<Tab disableRipple label="Catégories" />
					<Tab disableRipple label="Liste" />
				</Tabs>
			</Box>
			<Box
				sx={{
					backgroundColor: 'primary.main',
					transform: 'translateY(-50%)',
					mt: 2
				}}
			>
				<DateSwitcher />
			</Box>
			<Stack spacing={2} sx={{ py: 2, mx: 2 }}>
				<Card primary="Home" secondary="Something bla bla bla"></Card>
				<Card>
					<TransactionsList />
				</Card>
			</Stack>
			<AddButton onClick={handleAddTransaction} />
			<TransactionForm
				open={openDrawer}
				setOpen={setOpenDrawer}
				title="Add transaction"
			/>
		</>
	);
};
