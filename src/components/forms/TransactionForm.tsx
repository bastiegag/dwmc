import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import { FormProps, FieldData, TransactionItem } from 'types';
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
	setOpen,
	createNew
}) => {
	const { transactions } = useDataProvider();
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
		transactions && (
			<Drawer open={open} setOpen={setOpen} fullscreen={true} title={title}>
				<div onClick={(e) => e.stopPropagation()}>
					<FormProvider {...methods}>
						<Form<TransactionItem>
							current={transactions}
							collection="transactions"
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

type TransactionFormatFunction = (
	data: Record<string, unknown>,
	current: TransactionItem[]
) => Record<string, unknown>;

const formatData: TransactionFormatFunction = (data, current) => {
	const transactions = [...current];

	for (const [key, value] of Object.entries(data)) {
		switch (key) {
			case 'date': {
				let dateValue: string;
				if (dayjs.isDayjs(value)) {
					// If it's a dayjs object
					dateValue = (value as dayjs.Dayjs).format('YYYY/MM/DD');
				} else if (typeof value === 'string' || typeof value === 'number') {
					// If it's a string or number
					dateValue = dayjs(value).format('YYYY/MM/DD');
				} else {
					// Default to current date if value is invalid
					dateValue = dayjs().format('YYYY/MM/DD');
				}
				data[key] = dateValue;
				localStorage.setItem('dwmcLastDate', dateValue);
				break;
			}
			case 'amount': {
				data[key] = formatPriceToFloat(value as string);
				break;
			}
		}
	}

	const idx = transactions.findIndex(
		(item: TransactionItem) => item.id === data.id
	);

	if (idx !== -1) {
		transactions[idx] = {
			...transactions[idx],
			...(data as Partial<TransactionItem>)
		};
	} else {
		transactions.push(data as unknown as TransactionItem);
	}

	return { items: transactions };
};

const deleteData: TransactionFormatFunction = (data, current) => {
	const transactions = [...current];

	const idx = transactions.findIndex(
		(item: TransactionItem) => item.id === data.id
	);

	if (idx !== -1) {
		transactions.splice(idx, 1);
	}

	return { items: transactions };
};
