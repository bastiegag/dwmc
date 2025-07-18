import React from 'react';
import { Slide } from '@mui/material';

interface TabPanelProps {
	value: number;
	index: number;
}

export const TabPanel = ({
	value,
	index,
	children
}: React.PropsWithChildren<TabPanelProps>) => {
	const visible = value === index ? true : false;

	const tab = (
		<div role="tabpanel" hidden={value !== index}>
			{value === index && children}
		</div>
	);

	return (
		<Slide direction="up" in={visible}>
			{tab}
		</Slide>
	);
};
