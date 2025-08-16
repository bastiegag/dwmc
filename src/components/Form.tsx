import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconTrash } from '@tabler/icons-react';
import { Button, IconButton, List, ListItem, Stack } from '@mui/material';
import { getAuth } from 'firebase/auth';

import 'assets/scss/_form.scss';
import { FieldData, TransactionItem, CategoryItem } from 'types';
import { useSetDoc, useDate } from 'hooks';
import { Dialog } from 'components';
import {
	AmountField,
	CategoryField,
	ColorField,
	DateField,
	IconField,
	RadioField,
	SelectField,
	SwitchField,
	TextField,
	WalletField
} from 'components/fields';

interface FormProps<T extends TransactionItem | CategoryItem> {
	current: T[];
	collection: string;
	fields: FieldData[];
	values?: Record<string, string>;
	format: (
		data: Record<string, unknown>,
		current: T[]
	) => Record<string, unknown>;
	remove: (
		data: Record<string, unknown>,
		current: T[]
	) => Record<string, unknown>;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	createNew?: boolean;
}

export const Form = <T extends TransactionItem | CategoryItem>({
	current,
	collection,
	fields,
	values,
	format,
	remove,
	setOpen,
	createNew
}: FormProps<T>) => {
	const user = getAuth().currentUser;
	const { month } = useDate();
	const { watch, handleSubmit } = useFormContext();
	const [openDialog, setOpenDialog] = useState(false);

	if (!user) {
		throw new Error('User is not authenticated');
	}

	const { mutate: setDoc } = useSetDoc();

	const hidden = watch('type', values?.type);

	const handleCloseDrawer = () => {
		setOpen(false);
	};

	const handleOpenDialog = () => {
		setOpenDialog(true);
	};

	const handleDelete = (data: Record<string, unknown>) => {
		if (collection === 'transactions' && 'date' in data) {
			setDoc({
				userId: user.uid,
				data: {
					...remove(data, current),
					month: month,
					uid: user.uid
				},
				collection: collection
			});
		} else {
			setDoc({
				userId: user.uid,
				data: remove(data, current),
				collection: collection
			});
		}

		handleCloseDrawer();
	};

	const disabled = Boolean(
		values?.id === 'default' || values?.id === 'subdefault'
	);

	return (
		<>
			<form
				onSubmit={(e) => {
					e.stopPropagation();

					handleSubmit((data) => {
						if (collection === 'transactions' && 'date' in data) {
							setDoc({
								userId: user.uid,
								data: {
									...format(data, current),
									month: month,
									uid: user.uid
								},
								collection: collection
							});
						} else {
							setDoc({
								userId: user.uid,
								data: format(data, current),
								collection: collection
							});
						}

						handleCloseDrawer();
					})(e);
				}}
			>
				<List>
					{fields.map((field, index): React.ReactElement | null => {
						switch (field.type) {
							case 'hidden':
							case 'text':
								return (
									<TextField
										key={index}
										data={field}
										values={values}
										hiddenValue={hidden}
									/>
								);
							case 'amount':
								return (
									<AmountField
										key={index}
										data={field}
										values={values}
										hiddenValue={hidden}
									/>
								);
							case 'date':
								return (
									<DateField
										key={index}
										data={field}
										values={values}
										hiddenValue={hidden}
									/>
								);
							case 'radio':
								return (
									<RadioField
										key={index}
										data={field}
										values={values}
										hiddenValue={hidden}
									/>
								);
							case 'select':
								return (
									<SelectField
										key={index}
										data={field}
										values={values}
										hiddenValue={hidden}
									/>
								);
							case 'wallet':
								return (
									<WalletField
										key={index}
										data={field}
										values={values}
										hiddenValue={hidden}
									/>
								);
							case 'color':
								return (
									<ColorField
										key={index}
										data={field}
										values={values}
										hiddenValue={hidden}
									/>
								);
							case 'icon':
								return (
									<IconField
										key={index}
										data={field}
										values={values}
										hiddenValue={hidden}
									/>
								);
							case 'switch':
								return (
									<SwitchField
										key={index}
										data={field}
										values={values}
										hiddenValue={hidden}
									/>
								);
							case 'category':
								return (
									<CategoryField
										key={index}
										data={field}
										values={values}
										hiddenValue={hidden}
									/>
								);
							default:
								return null;
						}
					})}

					<ListItem>
						<Stack direction="row" spacing={2} sx={{ width: '100%' }}>
							{!createNew && (
								<IconButton disabled={disabled} onClick={handleOpenDialog}>
									<IconTrash />
								</IconButton>
							)}

							<Button type="submit" fullWidth variant="contained">
								Enregistrer
							</Button>
						</Stack>
					</ListItem>
				</List>
			</form>
			<Dialog
				open={openDialog}
				setOpen={setOpenDialog}
				action={() => handleDelete(values ?? {})}
			/>
		</>
	);
};
