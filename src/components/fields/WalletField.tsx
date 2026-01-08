import type { ReactElement } from 'react';
import { useCallback, useState, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { IconChevronDown } from '@tabler/icons-react';
import {
	FormControl,
	IconButton,
	InputBase,
	List,
	ListItem,
	ListItemIcon,
	Typography
} from '@mui/material';

import type { FieldProps, WalletItem } from 'types';
import { useWallets, useFieldVisibility } from 'hooks';
import { getWallet } from 'utils';
import { Drawer, Icon, ListChoice } from 'components';

/**
 * WalletField is a form component that displays the currently selected wallet and allows users to choose a different wallet from a drawer list.
 * It integrates with react-hook-form and uses MUI components for layout and styling.
 */
export const WalletField = ({ data, values, hiddenValue }: FieldProps) => {
	const { register, setValue, control } = useFormContext();
	const walletId =
		useWatch({ control, name: data.name }) ??
		(values as Record<string, string>)[data.name] ??
		'default';
	const { data: wallets } = useWallets();
	const [open, setOpen] = useState(false);

	const wallet: WalletItem | null = useMemo(() => {
		if (!wallets) return null;

		return getWallet(wallets, walletId) ?? null;
	}, [wallets, walletId]);

	// Determine if field should be visible
	const visible = useFieldVisibility(data.hidden, hiddenValue, data.name);

	// Open drawer to select wallet
	const handleOpen = useCallback(() => {
		setOpen(true);
	}, []);

	// Handle wallet selection and update form value
	const handleClose = useCallback(
		(id: string) => {
			setValue(data.name, id);
			setOpen(false);
		},
		[data.name, setValue]
	);

	// Render wallet choices for drawer
	const list: ReactElement[] | undefined = wallets?.map((item: WalletItem) => {
		const selected = walletId === item.id;
		const itemData = {
			id: item.id,
			name: item.name,
			icon: item.icon,
			color: item.color
		};
		return (
			<ListChoice
				key={item.id}
				data={itemData}
				selected={selected}
				handleClose={handleClose}
				round={false}
			/>
		);
	});

	// Hide field if not visible or wallet not found
	if (!visible || !wallet) return null;

	return (
		<>
			<ListItem onClick={handleOpen}>
				<ListItemIcon>
					<Icon icon={wallet.icon} color={wallet.color} round={false} />
				</ListItemIcon>

				<FormControl error fullWidth>
					<InputBase
						type="hidden"
						value={walletId}
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
	);
};
