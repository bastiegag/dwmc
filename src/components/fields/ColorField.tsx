import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconChevronDown } from '@tabler/icons-react';
import {
	Box,
	FormControl,
	IconButton,
	Input,
	ListItem,
	ListItemIcon,
	styled,
	Typography
} from '@mui/material';

import { FieldProps } from 'types';
import { isFieldVisible, colors } from 'utils';
import { Drawer, Icon, ListChoice } from 'components';

const ColorsWrapper = styled(Box, {
	name: 'Colors'
})({
	flexWrap: 'wrap',
	display: 'flex',
	justifyContent: 'center'
});

export const ColorField: FC<FieldProps> = ({ data, values, hiddenValue }) => {
	const { register, setValue, unregister } = useFormContext();
	const initialValue = values?.[data.name] ?? 'light';
	const [color, setColor] = useState(initialValue);
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

	const handleClose = (color: string) => {
		setColor(color);
		setValue(data.name, color);
		setOpen(false);
	};

	const list = colors.map((item) => {
		const selected = color && color === item ? true : false;
		const data = {
			id: item,
			color: item
		};

		return (
			<ListChoice
				key={item}
				data={data}
				selected={selected}
				small={true}
				handleClose={handleClose}
			/>
		);
	});

	if (!show) return null;

	return (
		<>
			<ListItem onClick={handleOpen}>
				<ListItemIcon>
					<Icon icon={data.icon} color={color} />
				</ListItemIcon>

				<FormControl error fullWidth>
					<Input
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
