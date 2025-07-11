import { FC } from 'react';
import {
	//FieldValues,
	FormProvider,
	//SubmitHandler,
	useForm
} from 'react-hook-form';
import { IconTrash } from '@tabler/icons-react';
import { Button, IconButton, List, ListItem, Stack } from '@mui/material';
import { getAuth } from 'firebase/auth';

import 'assets/scss/_form.scss';
import { useSetDoc, TransactionItem, useDrawer } from 'hooks';
import { FieldData } from 'components/fields';
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

interface FormProps {
	current: TransactionItem[];
	fields: FieldData[];
	values?: Record<string, string | number | boolean>;
	format: (
		data: Record<string, unknown>,
		current: TransactionItem[]
	) => Record<string, unknown>;
	collection: string;
}

export const Form: FC<FormProps> = ({
	current,
	fields,
	values,
	format,
	collection
}) => {
	const user = getAuth().currentUser;
	if (!user) {
		throw new Error('User is not authenticated');
	}
	const { dispatchDrawer } = useDrawer();
	const { mutate: setDoc } = useSetDoc();
	const methods = useForm({ mode: 'onBlur' });
	const hidden = methods.watch('type', values?.type);

	const handleCloseDrawer = () => {
		dispatchDrawer({
			type: 'close',
			current: []
		});
	};

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit((data) => {
					let month;
					let year;
					if (collection == 'transactions') {
						const date = new Date(data.date);
						month = date.getMonth() + 1;
						year = date.getFullYear();
					}

					if (month && year) {
						setDoc({
							userId: user.uid,
							data: format(data, current),
							collection,
							year,
							month
						});
					} else {
						setDoc({
							userId: user.uid,
							data: format(data, current),
							collection
						});
					}

					handleCloseDrawer();
				})}
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
							<IconButton>
								<IconTrash />
							</IconButton>
							<Button type="submit" fullWidth variant="contained">
								Enregistrer
							</Button>
						</Stack>
					</ListItem>
				</List>
			</form>
		</FormProvider>
	);
};
