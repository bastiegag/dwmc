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

import { FieldProps } from './types';
import { isFieldVisible, icons } from 'utils';
import { Drawer, Icon, ListChoice } from 'components';

const IconsWrapper = styled(Box, {
	name: 'Colors'
})({
	flexWrap: 'wrap',
	display: 'flex',
	justifyContent: 'center'
});

export const IconField: FC<FieldProps> = ({ data, values, hiddenValue }) => {
	const { register, setValue, unregister } = useFormContext();
	const initialValue = values[data.name] ?? 'IconArchive';
	const [icon, setIcon] = useState(initialValue);
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

	const handleClose = (icon: string) => {
		setIcon(icon);
		setValue(data.name, icon);
		setOpen(false);
	};

	const list = icons.map((item) => {
		const selected = icon && icon === item ? true : false;
		const data = {
			id: item,
			icon: item
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

	return (
		show && (
			<>
				<ListItem onClick={handleOpen}>
					<ListItemIcon>
						<Icon icon={icon} />
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
					<IconsWrapper sx={{ p: 1 }}>{list}</IconsWrapper>
				</Drawer>
			</>
		)
	);
};
