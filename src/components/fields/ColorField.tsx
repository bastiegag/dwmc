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
import { colors } from 'utils';
import { Drawer, Icon, ListChoice } from 'components';

/**
 * ColorsWrapper - Flex container for color choices in the drawer
 */
const ColorsWrapper = styled(Box, {
	name: 'colors'
})({
	flexWrap: 'wrap',
	display: 'flex',
	justifyContent: 'center'
});

/**
 * ColorField - A form field for selecting a color from a predefined palette.
 * Opens a drawer with color choices and updates the form value on selection.
 */
export const ColorField = ({ data, values, hiddenValue }: FieldProps) => {
	const { register, setValue } = useFormContext();
	// Initial color value from form or default
	const initialValue = values?.[data.name] ?? 'light';
	const [color, setColor] = useState(initialValue);
	const [open, setOpen] = useState(false);

	// Check if field should be visible based on conditional rules
	const visible = useFieldVisibility(data.hidden, hiddenValue, data.name);

	// Open drawer to select color
	const handleOpen = useCallback(() => setOpen(true), []);

	// Close drawer and update color value
	const handleClose = useCallback(
		(color: string) => {
			setColor(color);
			setValue(data.name, color);
			setOpen(false);
		},
		[data.name, setValue]
	);

	// Render color choices as ListChoice components
	const list = useMemo(
		() =>
			colors.map((item) => (
				<ListChoice
					key={item}
					data={{ id: item, color: item }}
					selected={color === item}
					small
					handleClose={handleClose}
				/>
			)),
		[color, handleClose]
	);

	if (!visible) return null;

	return (
		<>
			<ListItem onClick={handleOpen}>
				<ListItemIcon>
					<Icon icon={data.icon} color={color} />
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
				<ColorsWrapper sx={{ p: 1 }}>{list}</ColorsWrapper>
			</Drawer>
		</>
	);
};
