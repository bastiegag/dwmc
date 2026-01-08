import { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import type { FormProps, FieldData, TransactionItem } from 'types';
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
		name: 'type',
		type: 'radio',
		choices: [
			{ name: 'Expense', value: 'expense' },
			{ name: 'Income', value: 'income' },
			{ name: 'Transfer', value: 'transfer' }
		]
	},
	{
		name: 'category',
		type: 'category',
		label: 'Category:'
	},
	{
		name: 'from',
		type: 'wallet',
		label: 'From:',
		hidden: ['income'],
		drawerTitle: 'Select wallet'
	},
	{
		name: 'to',
		type: 'wallet',
		label: 'To:',
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

export const TransactionForm = ({
	title,
	values,
	open,
	setOpen,
	createNew
}: FormProps) => {
	const { transactions } = useDataProvider();
	const methods = useForm({
		mode: 'onBlur',
		defaultValues: values
	});

	useEffect(() => {
		if (open && values) methods.reset(values);
	}, [open, values, methods]);

	const formatData = useCallback<TransactionFormatFunction>((data, current) => {
		const updated = [...current];
		for (const [key, value] of Object.entries(data)) {
			if (key === 'date') {
				let dateValue: string;
				if (dayjs.isDayjs(value)) {
					dateValue = (value as dayjs.Dayjs).format('YYYY/MM/DD');
				} else if (typeof value === 'string' || typeof value === 'number') {
					dateValue = dayjs(value).format('YYYY/MM/DD');
				} else {
					dateValue = dayjs().format('YYYY/MM/DD');
				}
				data[key] = dateValue;
				localStorage.setItem('dwmcLastDate', dateValue);
			} else if (key === 'amount') {
				data[key] = formatPriceToFloat(value as string);
			}
		}
		const idx = updated.findIndex(
			(item: TransactionItem) => item.id === data.id
		);
		if (idx !== -1) {
			updated[idx] = { ...updated[idx], ...(data as Partial<TransactionItem>) };
			return { items: updated };
		}
		return { items: [...updated, data as unknown as TransactionItem] };
	}, []);

	const deleteData = useCallback<TransactionFormatFunction>((data, current) => {
		return {
			items: current.filter((item: TransactionItem) => item.id !== data.id)
		};
	}, []);

	if (!transactions) return null;
	return (
		<Drawer open={open} setOpen={setOpen} fullscreen title={title}>
			<div onClick={(e) => e.stopPropagation()}>
				<FormProvider {...methods}>
					<Form<TransactionItem>
						current={transactions}
						collection="transactions"
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

type TransactionFormatFunction = (
	data: Record<string, unknown>,
	current: TransactionItem[]
) => Record<string, unknown>;
