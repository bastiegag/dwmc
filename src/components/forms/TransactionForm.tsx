import { FC } from 'react';
import dayjs from 'dayjs';

import { TransactionItem, useDataProvider } from 'hooks';
import { FieldData } from 'components/fields';
import { FormProps } from './types';
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
		name: 'type',
		type: 'radio',
		choices: [
			{ name: 'Dépense', value: 'expense' },
			{ name: 'Revenu', value: 'income' },
			{ name: 'Virement', value: 'transfer' }
		]
	},
	{
		name: 'category',
		type: 'category',
		label: 'Catégorie:'
	},
	{
		name: 'from',
		type: 'wallet',
		label: 'De:',
		hidden: ['income'],
		drawerTitle: 'Select wallet'
	},
	{
		name: 'to',
		type: 'wallet',
		label: 'Vers:',
		hidden: ['expense'],
		drawerTitle: 'Select wallet'
	},
	{
		name: 'note',
		type: 'text',
		label: 'Note',
		icon: 'IconNote'
	},
	{
		name: 'date',
		type: 'date',
		label: 'Date',
		icon: 'IconCalendar'
	}
];

export const TransactionForm: FC<FormProps> = ({
	title,
	values,
	open,
	setOpen
}) => {
	const { transactions } = useDataProvider();

	return (
		transactions && (
			<Drawer open={open} setOpen={setOpen} fullScreen={true} title={title}>
				<Form
					current={transactions}
					fields={fields}
					values={values}
					format={formatData}
					setOpen={setOpen}
				/>
			</Drawer>
		)
	);
};

const formatData = (
	data: Record<string, unknown>,
	current: TransactionItem[]
): Record<string, unknown> => {
	for (const [key, value] of Object.entries(data)) {
		switch (key) {
			case 'date': {
				const date = dayjs(
					value as string | number | Date | null | undefined
				).format('YYYY/MM/DD');
				data[key] = date;
				localStorage.setItem('dwmcLastDate', date);
				break;
			}
			case 'amount': {
				data[key] = formatPriceToFloat(value as string);
				break;
			}
		}
	}

	const idx = current.findIndex((item) => item.id === data.id);
	if (idx !== -1) {
		current[idx] = { ...current[idx], ...data };
	}

	return { items: current };
};
