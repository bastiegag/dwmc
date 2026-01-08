import { useCallback, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconChevronDown } from '@tabler/icons-react';
import {
	Box,
	FormControl,
	IconButton,
	InputBase,
	ListItem,
	ListItemIcon,
	styled,
	Typography
} from '@mui/material';

import type { FieldProps } from 'types';
import { useFieldVisibility } from 'hooks';
import { icons } from 'utils';
import { Drawer, Icon, ListChoice } from 'components';

/**
 * IconsWrapper - Flex container for icon choices in the drawer
 */
const IconsWrapper = styled(Box, {
	name: 'Icons'
})({
	flexWrap: 'wrap',
	display: 'flex',
	justifyContent: 'center'
});

/**
 * IconField - A form field for selecting an icon from a predefined set.
 * Opens a drawer with icon choices and updates the form value on selection.
 */
export const IconField = ({ data, values, hiddenValue }: FieldProps) => {
	const { register, setValue } = useFormContext();
	// Initial icon value from form or default
	const initialValue =
		(values as Record<string, string>)[data.name] ?? 'IconArchive';
	const [icon, setIcon] = useState(initialValue);
	const [open, setOpen] = useState(false);

	// Check if field should be visible based on conditional rules
	const visible = useFieldVisibility(data.hidden, hiddenValue, data.name);

	// Open drawer to select icon
	const handleOpen = useCallback(() => setOpen(true), []);

	// Close drawer and update icon value
	const handleClose = useCallback(
		(icon: string) => {
			setIcon(icon);
			setValue(data.name, icon);
			setOpen(false);
		},
		[data.name, setValue]
	);

	// Render icon choices as ListChoice components
	const list = useMemo(
		() =>
			icons.map((item) => (
				<ListChoice
					key={item}
					data={{ id: item, icon: item }}
					selected={icon === item}
					small
					handleClose={handleClose}
				/>
			)),
		[icon, handleClose]
	);

	if (!visible) return null;

	return (
		<>
			<ListItem onClick={handleOpen}>
				<ListItemIcon>
					<Icon icon={icon} />
				</ListItemIcon>
				<FormControl error fullWidth>
					<InputBase
						type="hidden"
						defaultValue={initialValue}
						placeholder={data.label}
						{...register(data.name)}
					/>
					<Typography>{data.label}</Typography>
				</FormControl>
				<IconButton>
					<IconChevronDown />
				</IconButton>
			</ListItem>
			<Drawer
				open={open}
				setOpen={setOpen}
				title={data.drawerTitle ?? 'Select'}
			>
				<IconsWrapper sx={{ p: 1 }}>{list}</IconsWrapper>
			</Drawer>
		</>
	);
};
