import { FC, useState } from 'react';
import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	useForm
} from 'react-hook-form';
import { IconTrash } from '@tabler/icons-react';
import { Box, Button, IconButton, List, ListItem, Stack } from '@mui/material';

import 'assets/scss/_form.scss';
import { FieldData } from 'components/fields';
import { Drawer } from 'components';
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
	id: string;
	fields: FieldData[];
}

export const Form: FC<FormProps> = ({ id, fields }) => {
	const methods = useForm({ mode: 'onBlur' });
	const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
	const [open, setOpen] = useState(false);
	const values: Record<string, string> = {};

	const hidden = methods.watch('type', values.type);

	return (
		<FormProvider {...methods}>
			<form
				id={id}
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
							<IconButton onClick={() => setOpen(true)}>
								<IconTrash />
							</IconButton>
							<Button type="submit" fullWidth variant="contained">
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
