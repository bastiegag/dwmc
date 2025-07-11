import { FC, ReactElement, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconChevronDown } from '@tabler/icons-react';
import {
	FormControl,
	IconButton,
	Input,
	List,
	ListItem,
	ListItemIcon,
	Typography
} from '@mui/material';

import { FieldProps } from './types';
import { useWallets } from 'hooks';
import { WalletItem } from 'hooks/useWallets';
import { getWallet, isFieldVisible } from 'utils';
import { Drawer, Icon, ListChoice } from 'components';

export const WalletField: FC<FieldProps> = ({ data, values, hiddenValue }) => {
	const { register, unregister, setValue } = useFormContext();
	const initialValue = values?.[data.name] ?? 'default';
	const { data: wallets } = useWallets();
	const [wallet, setWallet] = useState<WalletItem | null>(null);
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

	useEffect(() => {
		const found: WalletItem | undefined = wallets
			? getWallet(wallets, initialValue)
			: undefined;
		setWallet(found ?? null);
	}, [wallets, initialValue]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = (id: string | number) => {
		const newWallet: WalletItem | undefined = wallets
			? getWallet(wallets, id)
			: undefined;
		setWallet(newWallet ?? null);
		setValue(data.name, id);
		setOpen(false);
	};

	let list: ReactElement[] | undefined;
	if (wallets) {
		list = wallets.map((item: WalletItem) => {
			const selected = wallet ? wallet.id === item.id : false;
			const data = {
				id: item.id,
				name: item.name,
				icon: item.icon,
				color: item.color
			};
			return (
				<ListChoice
					key={item.id}
					data={data}
					selected={selected}
					handleClose={handleClose}
				/>
			);
		});
	}

	return (
		show &&
		wallet && (
			<>
				<ListItem onClick={handleOpen}>
					<ListItemIcon>
						<Icon icon={wallet.icon} color={wallet.color} />
					</ListItemIcon>

					<FormControl error fullWidth>
						<Input
							type="hidden"
							defaultValue={initialValue}
							placeholder={data.label}
							{...register(data.name)}
						/>
						<Typography>
							{data.label} {wallet.name ?? ''}
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
					<List>{list}</List>
				</Drawer>
			</>
		)
	);
};
