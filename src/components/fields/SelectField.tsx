import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconChevronDown } from '@tabler/icons-react';
import {
	FormControl,
	IconButton,
	InputBase,
	ListItem,
	ListItemIcon,
	Typography
} from '@mui/material';

import type { FieldProps } from 'types';
import { useFieldVisibility } from 'hooks';
import { Drawer, Icon, ListChoice } from 'components';

/**
 * SelectField is a form component that displays a selectable list of choices in a drawer.
 * It integrates with react-hook-form for form state management and supports conditional visibility.
 * The component displays the current selection and allows users to choose an option from a drawer.
 */
export const SelectField = ({ data, values, hiddenValue }: FieldProps) => {
	const { register, setValue } = useFormContext();
	// Initial select value from form or first choice
	const initialValue = String(
		values?.[data.name] ?? data.choices?.[0]?.value ?? ''
	);
	const [selectValue, setSelectValue] = useState<string>(initialValue);
	const [open, setOpen] = useState(false);

	// Check if field should be visible based on conditional rules
	const visible = useFieldVisibility(data.hidden, hiddenValue, data.name);

	// Open drawer to select option
	const handleOpen = useCallback(() => setOpen(true), []);

	// Close drawer and update select value
	const handleClose = useCallback(
		(value: string, label?: string) => {
			if (label) setSelectValue(label);
			setValue(data.name, value);
			setOpen(false);
		},
		[data.name, setValue]
	);

	const list = data.choices?.map((item) => {
		const selected = selectValue === item.name;
		const itemData = { id: item.value, name: item.name };
		return (
			<ListChoice
				key={item.value}
				data={itemData}
				selected={selected}
				handleClose={handleClose}
			/>
		);
	});

	if (!visible) return null;

	return (
		<>
			<ListItem onClick={handleOpen}>
				{data.icon && (
					<ListItemIcon>
						<Icon icon={data.icon} />
					</ListItemIcon>
				)}
				<FormControl error fullWidth>
					<InputBase
						type="hidden"
						defaultValue={initialValue}
						placeholder={data.label}
						{...register(data.name)}
					/>
					<Typography>
						{data.label} {selectValue ?? ''}
					</Typography>
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
				{list}
			</Drawer>
		</>
	);
};
