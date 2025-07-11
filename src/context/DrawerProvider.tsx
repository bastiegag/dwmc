import React, { useMemo, useReducer } from 'react';
import dayjs from 'dayjs';

import { TransactionItem } from 'hooks';
import {
	DrawerContextType,
	DrawerAction,
	DrawerContext,
	DrawerState
} from 'context';
import { Form } from 'components';
import { FieldData } from 'components/fields';
import { formatPriceToFloat } from 'utils';

export const DrawerProvider = ({
	children
}: React.PropsWithChildren<unknown>) => {
	const initialState: DrawerState = {
		open: false,
		title: ''
	};

	const reducer = (drawer: DrawerState, action: DrawerAction): DrawerState => {
		switch (action.type) {
			case 'add-transaction':
				return {
					open: true,
					title: action.title || 'Ajouter une transaction',
					fullScreen: true,
					content: (
						<Form
							current={action.current}
							fields={transactionFields}
							format={formatTransaction}
							collection="transactions"
						/>
					)
				};
			case 'edit-transaction':
				return {
					open: true,
					title: action.title || 'Modifier une transaction',
					fullScreen: true,
					content: (
						<Form
							current={action.current}
							fields={transactionFields}
							values={action.values}
							format={formatTransaction}
							collection="transactions"
						/>
					)
				};
			case 'close':
			default:
				return {
					...drawer,
					open: false
				};
		}
	};
	const [drawer, dispatchDrawer] = useReducer(reducer, initialState);
	const value = useMemo<DrawerContextType>(
		() => ({ drawer, dispatchDrawer }),
		[drawer, dispatchDrawer]
	);

	return (
		<DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
	);
};

const formatTransaction = (
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

const transactionFields: FieldData[] = [
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
