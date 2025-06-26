import React from 'react';
import { useState } from 'react';
import {
	useForm,
	SubmitHandler,
	FormProvider,
	FieldValues
} from 'react-hook-form';
import { IconTrash } from '@tabler/icons-react';
import { Button, IconButton, List, ListItem, Stack, Box } from '@mui/material';

import 'assets/scss/_form.scss';
import { Drawer } from 'components';
import {
	AmountField,
	DateField,
	TextField,
	RadioField,
	WalletField
} from 'components/fields';
import * as Icons from '@tabler/icons-react';

type TablerIconsType = keyof typeof Icons;

// Remove the old Fields type

// Define a type for all possible field objects
interface FieldBase {
	name: string;
	type: string;
	label?: string;
	icon?: TablerIconsType;
	hidden?: number;
	required?: boolean;
	choices?: { name: string; value: number }[];
}

const fields: FieldBase[] = [
	{
		name: 'note',
		type: 'text',
		label: 'Note',
		icon: 'IconNote',
		required: true
	},
	{
		name: 'amount',
		type: 'amount',
		label: 'Amount',
		icon: 'IconCoins',
		required: true
	},
	{
		name: 'date',
		type: 'date',
		label: 'Date',
		icon: 'IconCalendar',
		required: true
	},
	{
		name: 'type',
		type: 'radio',
		choices: [
			{ name: 'Dépense', value: 0 },
			{ name: 'Revenu', value: 1 },
			{ name: 'Virement', value: 2 }
		],
		required: true
	},
	{
		name: 'select',
		type: 'wallet',
		label: 'Wallet',
		icon: 'IconLibrary'
	}
];

export const Form = () => {
	const methods = useForm({ mode: 'onBlur' });
	const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
	const [open, setOpen] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const values: Record<string, string> = {};

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit((data) => {
					onSubmit(data);
				})}
			>
				<List>
					{fields.map((field, index): React.ReactElement | null => {
						switch (field.type) {
							case 'text':
								return (
									<TextField
										key={index}
										data={field}
										values={values}
										setDisabled={setDisabled}
									/>
								);
							case 'amount':
								return (
									<AmountField
										key={index}
										data={field}
										values={values}
										setDisabled={setDisabled}
									/>
								);
							case 'date':
								return (
									<DateField
										key={index}
										data={field}
										values={values}
										setDisabled={setDisabled}
									/>
								);
							case 'radio':
								return (
									<RadioField
										key={index}
										data={field}
										values={values}
										setDisabled={setDisabled}
									/>
								);
							case 'wallet':
								return (
									<WalletField
										key={index}
										data={field}
										values={values}
										setDisabled={setDisabled}
									/>
								);
							default:
								return null;
						}
					})}

					<ListItem>
						<Stack direction="row" spacing={2} sx={{ width: '100%' }}>
							<IconButton onClick={() => setOpen(true)}>
								<IconTrash />
							</IconButton>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								disabled={disabled}
							>
								Enregistrer
							</Button>
							<Drawer open={open} setOpen={setOpen}>
								<Box sx={{ p: 2 }}>Delete that super duper form!</Box>
							</Drawer>
						</Stack>
					</ListItem>
				</List>
			</form>
		</FormProvider>
	);
};
