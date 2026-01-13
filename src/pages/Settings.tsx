import { Stack } from '@mui/material';

import { AlertMessage, TabPanel } from 'components';

const Settings = () => {
	return (
		<>
			<TabPanel value={0} index={0}>
				<Stack spacing={2} sx={{ py: 2, mx: 2 }}>
					Settings
				</Stack>
			</TabPanel>

			<AlertMessage />
		</>
	);
};

export default Settings;
