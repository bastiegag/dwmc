import { FC } from 'react';

import { FieldData } from 'components/fields';
import { FormProps } from './types';
import { useDataProvider, CategoryItem, TransactionItem } from 'hooks';
import { Drawer, Form } from 'components';

export const CategoryForm: FC<FormProps> = ({
	open,
	setOpen,
	values,
	anchor
}) => {
	const { categories, rawCategories } = useDataProvider();

	const fields: FieldData[] = [
		{
			name: 'id',
			type: 'hidden'
		},
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
							.filter((cat) => cat.type === 'section')
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

	return (
		categories && (
			<Drawer
				open={open}
				anchor={anchor}
				setOpen={setOpen}
				fullscreen={true}
				title="Add category"
			>
				<Form
					current={rawCategories}
					collection="categories"
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
	current: TransactionItem[] | CategoryItem[]
): Record<string, unknown> => {
	const idx = current.findIndex((item) => item.id === data.id);
	if (idx !== -1) {
		current[idx] = { ...current[idx], ...data };
	} else {
		current.push(data);
	}

	return { items: current };
};
