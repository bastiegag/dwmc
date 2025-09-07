import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { FormProps, FieldData, WalletItem } from 'types';
import { useDataProvider } from 'hooks';
import { Drawer, Form } from 'components';
import { formatPriceToFloat } from 'utils';

const fields: FieldData[] = [
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
		label: 'Nom',
		icon: 'IconTag',
		required: true
	},
	{
		name: 'color',
		type: 'color',
		label: 'Couleur',
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
		label: 'Objectif',
		icon: 'IconPigMoney'
	}
];

export const WalletForm: FC<FormProps> = ({
	title,
	values,
	open,
	setOpen,
	createNew
}) => {
	const { wallets } = useDataProvider();
	const methods = useForm({
		mode: 'onBlur',
		defaultValues: values
	});

	useEffect(() => {
		if (open && values) {
			methods.reset(values);
		}
	}, [values, open, methods]);

	return (
		wallets && (
			<Drawer open={open} setOpen={setOpen} fullscreen={true} title={title}>
				<div onClick={(e) => e.stopPropagation()}>
					<FormProvider {...methods}>
						<Form<WalletItem>
							current={wallets}
							collection="wallets"
							fields={fields}
							values={values}
							format={formatData}
							remove={deleteData}
							setOpen={setOpen}
							createNew={createNew}
						/>
					</FormProvider>
				</div>
			</Drawer>
		)
	);
};

type WalletFormatFunction = (
	data: Record<string, unknown>,
	current: WalletItem[]
) => Record<string, unknown>;

const formatData: WalletFormatFunction = (data, current) => {
	const wallets = [...current];

	for (const [key, value] of Object.entries(data)) {
		switch (key) {
			case 'amount': {
				data[key] = formatPriceToFloat(value as string);
				break;
			}
		}
	}

	const idx = wallets.findIndex((item: WalletItem) => item.id === data.id);

	if (idx !== -1) {
		wallets[idx] = {
			...wallets[idx],
			...(data as Partial<WalletItem>)
		};
	} else {
		wallets.push(data as unknown as WalletItem);
	}

	return { items: wallets };
};

const deleteData: WalletFormatFunction = (data, current) => {
	const wallets = [...current];

	const idx = wallets.findIndex((item: WalletItem) => item.id === data.id);

	if (idx !== -1) {
		wallets.splice(idx, 1);
	}

	return { items: wallets };
};
