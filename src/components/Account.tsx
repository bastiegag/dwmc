import { useState } from 'react';
import { IconUser } from '@tabler/icons-react';
import { IconButton, List } from '@mui/material';

import { Drawer } from 'components';

export const Account = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<>
			<IconButton onClick={handleOpen} sx={{ color: 'white' }}>
				<IconUser />
			</IconButton>

			<Drawer open={open} setOpen={setOpen} title={'Account'}>
				<List></List>
			</Drawer>
		</>
	);
};
