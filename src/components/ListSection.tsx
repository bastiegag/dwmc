import React, { useState, useCallback } from 'react';
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

import type { CategoryItem } from 'types';

interface ListSectionProps {
	data: CategoryItem;
	edit?: boolean;
	handleEdit?: (item: CategoryItem) => void;
	children?: React.ReactNode;
}

export const ListSection = ({
	data,
	edit = false,
	handleEdit,
	children
}: ListSectionProps) => {
	const theme = useTheme();
	const [open, setOpen] = useState<boolean>(true);

	const handleToggle = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	const handleEditClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			handleEdit?.(data);
		},
		[handleEdit, data]
	);

	return (
		<>
			<ListSubheader
				onClick={handleToggle}
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
					<IconButton color="primary" onClick={handleEditClick}>
						<IconPencil color={theme.palette.primary.main} />
					</IconButton>
				)}
			</ListSubheader>
			<Collapse in={open}>{children}</Collapse>
		</>
	);
};
