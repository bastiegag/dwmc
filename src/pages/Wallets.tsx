import { useState } from 'react';
import { Stack } from '@mui/material';

import { AddButton, AlertMessage, TabPanel } from 'components';
import { WalletForm } from 'components/forms';
import { WalletsList } from 'components/widgets';

const Wallets = () => {
	const [openDrawer, setOpenDrawer] = useState(false);

	const handleAddWallet = () => {
		setOpenDrawer(true);
	};

	return (
		<>
			<TabPanel value={0} index={0}>
				<Stack spacing={2} sx={{ py: 2, mx: 2 }}>
					<WalletsList />
				</Stack>
			</TabPanel>

			<AddButton onClick={handleAddWallet} />
			<WalletForm
				open={openDrawer}
				values={{
					id: crypto.randomUUID()
				}}
				setOpen={setOpenDrawer}
				title="Add wallet"
				createNew={true}
			/>
			<AlertMessage />
		</>
	);
};

export default Wallets;
