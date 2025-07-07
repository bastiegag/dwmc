import React, { useState } from 'react';
import { IconEyeOff, IconEye } from '@tabler/icons-react';
import { ListSubheader, Collapse, IconButton } from '@mui/material';

interface ListSectionProps {
	title?: string;
}

export const ListSection = ({
	title,
	children
}: React.PropsWithChildren<ListSectionProps>) => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<>
			<ListSubheader
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				{title}
				<IconButton onClick={() => setOpen(!open)}>
					{open ? <IconEyeOff /> : <IconEye />}
				</IconButton>
			</ListSubheader>
			<Collapse in={open}>{children}</Collapse>
		</>
	);
};
