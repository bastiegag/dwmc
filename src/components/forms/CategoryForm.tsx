import { FC } from 'react';
import { Paper, CircularProgress, Alert } from '@mui/material';

import { FieldData } from 'components/fields';
import { FormProps } from './types';
import { useCategories } from 'hooks';
import { Drawer, Form } from 'components';

export const CategoryForm: FC<FormProps> = ({ open, setOpen }) => {
	const { data: categories, isLoading, error } = useCategories();

	const fields: FieldData[] = [
		{
			name: 'type',
			type: 'radio',
			choices: [
				{ name: 'Section', value: 'section' },
				{ name: 'Catégorie', value: 'category' }
			]
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
			icon: 'IconColorPicker',
			hidden: ['category']
		},
		{
			name: 'section',
			type: 'select',
			label: 'Section:',
			icon: 'IconSection',
			hidden: ['section'],
			choices: [
				...(categories
					? categories
							.filter((cat) => cat.type === 0)
							.map((cat) => ({
								name: cat.name,
								value: cat.id
							}))
					: [])
			]
		},
		{
			name: 'icon',
			type: 'icon',
			label: 'Icon',
			icon: 'IconPhoto',
			hidden: ['section']
		}
	];

	if (error) {
		return (
			<Alert severity="error">
				Error loading transactions: {error.message}
			</Alert>
		);
	}

	if (isLoading) {
		return (
			<Paper
				elevation={0}
				sx={{ p: 3, display: 'flex', justifyContent: 'center' }}
			>
				<CircularProgress />
			</Paper>
		);
	}

	return (
		<Drawer
			open={open}
			setOpen={setOpen}
			fullScreen={true}
			title="Add category"
		>
			<Form id="category" fields={fields} />
		</Drawer>
	);
};
