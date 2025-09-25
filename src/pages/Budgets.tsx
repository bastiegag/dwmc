//import { useState } from 'react';
import { Stack } from '@mui/material';

import { AlertMessage, TabPanel } from 'components';

const Budgets = () => {
	//const [openDrawer, setOpenDrawer] = useState(false);

	//const handleAddBudget = () => {
	//	setOpenDrawer(true);
	//};

	return (
		<>
			<TabPanel value={0} index={0}>
				<Stack spacing={2} sx={{ py: 2, mx: 2 }}>
					Budgets
				</Stack>
			</TabPanel>

			<AlertMessage />
		</>
	);
};

export default Budgets;
