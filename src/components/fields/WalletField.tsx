import { FC, ChangeEvent, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import * as Icons from '@tabler/icons-react';
import { IconChevronDown } from '@tabler/icons-react';
import {
	Input,
	FormControl,
	ListItem,
	IconButton,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	FormHelperText,
	Avatar,
	List
} from '@mui/material';

import { useWallets } from 'hooks';
import { Drawer, Icon } from 'components';

type TablerIconsType = keyof typeof Icons;

interface WalletFieldData {
	name: string;
	type: string;
	label?: string;
	icon?: TablerIconsType;
	hidden?: number;
	required?: boolean;
}

interface WalletFieldProps {
	data: WalletFieldData;
	values: Record<string, string>;
	setDisabled: (disabled: boolean) => void;
}

export const WalletField: FC<WalletFieldProps> = ({
	data,
	values,
	setDisabled
}) => {
	const {
		register,
		setValue,
		trigger,
		formState: { errors }
	} = useFormContext();
	const { data: wallets } = useWallets();
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');

	useEffect(() => {
		setValue(data.name, selectedValue);
		//trigger(data.name);
	}, [selectedValue, setValue, data, trigger]);

	const IconComponent = data.icon ? (Icons[data.icon] as FC) : null;
	const initialValue =
		typeof values[data.name] !== 'undefined' ? values[data.name] : '';

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (data.required) {
			if (event.target.value !== '') {
				setDisabled(false);
			} else {
				setDisabled(true);
			}
		}
	};

	const handleClose = (id: string) => {
		setSelectedValue(id);
		setOpen(false);
	};

	let list;
	if (wallets) {
		list = wallets.wallets.map((item) => {
			return (
				<ListItemButton key={item.id} onClick={() => handleClose(item.id)}>
					<ListItemIcon>
						<Icon icon={item.icon} color={item.color} />
					</ListItemIcon>
					<ListItemText primary={item.name} />
				</ListItemButton>
			);
		});
	}

	return (
		<ListItem sx={{ ...(data.type === 'hidden' && { display: 'none' }) }}>
			{IconComponent && (
				<ListItemIcon>
					<Avatar>
						<IconComponent />
					</Avatar>
				</ListItemIcon>
			)}

			<FormControl error fullWidth onChange={handleChange}>
				<Input
					readOnly
					onClick={() => {
						setOpen(true);
					}}
					defaultValue={initialValue}
					placeholder={data.label}
					{...register(data.name, { required: data.required })}
				/>
				{errors[data.name] && (
					<FormHelperText error>Ce champ est obligatoire</FormHelperText>
				)}
			</FormControl>
			<Drawer open={open} setOpen={setOpen} title="Select a wallet">
				<List>{list}</List>
			</Drawer>

			<IconButton
				onClick={() => {
					setOpen(true);
				}}
			>
				<IconChevronDown />
			</IconButton>
		</ListItem>
	);
};
