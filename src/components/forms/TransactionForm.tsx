import { FC } from 'react';

import { FieldData } from 'components/fields';
import { FormProps } from './types';
import { Drawer, Form } from 'components';

const fields: FieldData[] = [
	//{
	//	name: 'amount',
	//	type: 'amount',
	//	required: true
	//},
	//{
	//	name: 'type',
	//	type: 'radio',
	//	choices: [
	//		{ name: 'Dépense', value: 'expense' },
	//		{ name: 'Revenu', value: 'income' },
	//		{ name: 'Virement', value: 'transfer' }
	//	]
	//},
	//{
	//	name: 'cat',
	//	type: 'category',
	//	label: 'Catégorie'
	//},
	//{
	//	name: 'from',
	//	type: 'wallet',
	//	label: 'De:',
	//	hidden: ['income']
	//},
	//{
	//	name: 'to',
	//	type: 'wallet',
	//	label: 'Vers:',
	//	hidden: ['expense']
	//},
	{
		name: 'note',
		type: 'text',
		label: 'Note',
		icon: 'IconNote'
	}
	//{
	//	name: 'date',
	//	type: 'date',
	//	label: 'Date',
	//	icon: 'IconCalendar'
	//}
];

export const TransactionForm: FC<FormProps> = ({
	title,
	values,
	open,
	setOpen
}) => {
	return (
		<Drawer open={open} setOpen={setOpen} fullScreen={true} title={title}>
			<Form id="transaction" fields={fields} values={values} />
		</Drawer>
	);
};
