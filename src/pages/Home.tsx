import React, { useState } from 'react';
import { Box, Tab, Tabs, Stack, useTheme } from '@mui/material';

import {
	DateSwitcher,
	Card,
	AddButton,
	TabPanel,
	AlertMessage
} from 'components';
import { TransactionForm } from 'components/forms';
import { LastTransactions, TransactionsList } from 'components/widgets';
import dayjs from 'dayjs';

export const Home = () => {
	const theme = useTheme();
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
					mt: 2,
					position: 'sticky',
					top: theme.spacing(2)
				}}
			>
				<DateSwitcher />
			</Box>

			<TabPanel value={tab} index={0}>
				<Stack spacing={2} sx={{ py: 2, mx: 2 }}>
					<Card primary="Last transactions">
						<LastTransactions />
					</Card>
				</Stack>
			</TabPanel>

			<TabPanel value={tab} index={2}>
				<Stack spacing={2} sx={{ py: 2, mx: 2 }}>
					<Card primary="Transactions">
						<TransactionsList />
					</Card>
				</Stack>
			</TabPanel>

			<AddButton onClick={handleAddTransaction} />
			<TransactionForm
				open={openDrawer}
				values={{
					id: crypto.randomUUID(),
					type: 'expense',
					date: dayjs().format('YYYY/MM/DD')
				}}
				setOpen={setOpenDrawer}
				title="Add transaction"
				createNew={true}
			/>
			<AlertMessage />
		</>
	);
};
