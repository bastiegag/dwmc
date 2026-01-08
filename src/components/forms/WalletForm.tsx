import { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { FormProps, FieldData, WalletItem } from 'types';
import { useDataProvider } from 'hooks';
import { Drawer, Form } from 'components';
import { formatPriceToFloat } from 'utils';

const BASE_FIELDS: FieldData[] = [
	{
		name: 'id',
		type: 'hidden'
	},
	{
		name: 'amount',
		type: 'amount',
		required: true
	},
	{
		name: 'name',
		type: 'text',
		label: 'Name',
		icon: 'IconTag',
		required: true
	},
	{
		name: 'color',
		type: 'color',
		label: 'Color',
		icon: 'IconColorPicker'
	},
	{
		name: 'icon',
		type: 'icon',
		label: 'Icon',
		icon: 'IconPhoto'
	},
	{
		name: 'goal',
		type: 'amount',
		label: 'Goal',
		icon: 'IconPigMoney'
	}
];

export const WalletForm = ({
	title,
	values,
	open,
	setOpen,
	createNew
}: FormProps) => {
	const { wallets } = useDataProvider();
	const methods = useForm({
		mode: 'onBlur',
		defaultValues: values
	});

	useEffect(() => {
		if (open && values) methods.reset(values);
	}, [open, values, methods]);

	const formatData = useCallback<WalletFormatFunction>((data, current) => {
		const updated = [...current];
		for (const [key, value] of Object.entries(data)) {
			if (key === 'amount') {
				data[key] = formatPriceToFloat(value as string);
			}
		}
		const idx = updated.findIndex((item: WalletItem) => item.id === data.id);
		if (idx !== -1) {
			updated[idx] = { ...updated[idx], ...(data as Partial<WalletItem>) };
			return { items: updated };
		}
		return { items: [...updated, data as unknown as WalletItem] };
	}, []);

	const deleteData = useCallback<WalletFormatFunction>((data, current) => {
		return { items: current.filter((item: WalletItem) => item.id !== data.id) };
	}, []);

	if (!wallets) return null;
	return (
		<Drawer open={open} setOpen={setOpen} fullscreen title={title}>
			<div onClick={(e) => e.stopPropagation()}>
				<FormProvider {...methods}>
					<Form<WalletItem>
						current={wallets}
						collection="wallets"
						fields={BASE_FIELDS}
						values={values}
						format={formatData}
						remove={deleteData}
						setOpen={setOpen}
						createNew={createNew}
					/>
				</FormProvider>
			</div>
		</Drawer>
	);
};

type WalletFormatFunction = (
	data: Record<string, unknown>,
	current: WalletItem[]
) => Record<string, unknown>;
