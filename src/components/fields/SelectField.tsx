import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconChevronDown } from '@tabler/icons-react';
import {
	FormControl,
	IconButton,
	Input,
	ListItem,
	ListItemIcon,
	Typography
} from '@mui/material';

import { FieldProps } from 'types';
import { isFieldVisible } from 'utils';
import { Drawer, Icon, ListChoice } from 'components';

export const SelectField: FC<FieldProps> = ({ data, values, hiddenValue }) => {
	const { register, setValue, unregister } = useFormContext();
	const initialValue = String(
		values?.[data.name] ?? data.choices?.[0]?.value ?? ''
	);
	const [selectValue, setSelectValue] = useState<string>(initialValue);
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(true);

	useEffect(() => {
		if (isFieldVisible(data.hidden, hiddenValue)) {
			setShow(true);
		} else {
			unregister(data.name);
			setShow(false);
		}
	}, [hiddenValue, data, unregister]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = (value: string, label?: string) => {
		if (label) {
			setSelectValue(label);
		}
		setValue(data.name, value);
		setOpen(false);
	};

	const list = data.choices?.map((item) => {
		const selected = selectValue && selectValue === item.name ? true : false;
		const data = {
			id: item.value,
			name: item.name
		};

		return (
			<ListChoice
				key={item.value}
				data={data}
				selected={selected}
				handleClose={handleClose}
			/>
		);
	});

	return (
		show && (
			<>
				<ListItem onClick={handleOpen}>
					{data.icon && (
						<ListItemIcon>
							<Icon icon={data.icon} />
						</ListItemIcon>
					)}

					<FormControl error fullWidth>
						<Input
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
		)
	);
};
