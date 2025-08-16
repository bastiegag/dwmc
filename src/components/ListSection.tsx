import React, { useState } from 'react';
import {
	IconPencil,
	IconChevronDown,
	IconChevronUp
} from '@tabler/icons-react';
import {
	ListSubheader,
	Collapse,
	IconButton,
	useTheme,
	Stack
} from '@mui/material';

import { CategoryItem } from 'types';

interface ListSectionProps {
	data: CategoryItem;
	edit?: boolean;
	handleEdit?: (item: CategoryItem) => void;
}

export const ListSection = ({
	data,
	edit = false,
	handleEdit,
	children
}: React.PropsWithChildren<ListSectionProps>) => {
	const theme = useTheme();
	const [open, setOpen] = useState<boolean>(true);

	return (
		<>
			<ListSubheader
				onClick={() => setOpen(!open)}
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					bgcolor: 'grey.50'
				}}
			>
				<Stack direction="row" alignItems="center" spacing={1}>
					{open ? (
						<IconChevronUp width={16} height={16} />
					) : (
						<IconChevronDown width={16} height={16} />
					)}
					<span>{data.name}</span>
				</Stack>
				{edit && (
					<IconButton
						color="primary"
						onClick={(e) => {
							e.stopPropagation();
							handleEdit?.(data);
						}}
					>
						<IconPencil color={theme.palette.primary.main} />
					</IconButton>
				)}
			</ListSubheader>
			<Collapse in={open}>{children}</Collapse>
		</>
	);
};
