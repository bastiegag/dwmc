import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { FormProps, FieldData, CategoryItem } from 'types';
import { useDataProvider } from 'hooks';
import { Drawer, Form } from 'components';

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
		hidden: ['section']
	},
	{
		name: 'icon',
		type: 'icon',
		label: 'Icon',
		icon: 'IconPhoto',
		hidden: ['section']
	}
];

export const CategoryForm: FC<FormProps> = ({
	open,
	setOpen,
	values,
	anchor
}) => {
	const { categories, rawCategories } = useDataProvider();
	const methods = useForm({
		mode: 'onBlur',
		defaultValues: values
	});

	useEffect(() => {
		if (open && values) {
			methods.reset(values);
		}
	}, [values, open, methods]);

	useEffect(() => {
		const choices = [
			...(categories
				? categories
						.filter((cat) => cat.type === 'section')
						.map((cat) => ({
							name: cat.name,
							value: cat.id
						}))
				: [])
		];
		fields[4].choices = choices;
	}, [categories]);

	return (
		categories && (
			<Drawer
				open={open}
				anchor={anchor}
				setOpen={setOpen}
				fullscreen={true}
				title="Add category"
			>
				<div onClick={(e) => e.stopPropagation()}>
					<FormProvider {...methods}>
						<Form<CategoryItem>
							current={rawCategories ?? []}
							collection="categories"
							fields={fields}
							values={values}
							format={formatData}
							remove={deleteData}
							setOpen={setOpen}
						/>
					</FormProvider>
				</div>
			</Drawer>
		)
	);
};

type CategoryFormatFunction = (
	data: Record<string, unknown>,
	current: CategoryItem[]
) => Record<string, unknown>;

const formatData: CategoryFormatFunction = (data, current) => {
	const categories = [...current];

	const idx = categories.findIndex((item: CategoryItem) => item.id === data.id);
	if (idx !== -1) {
		categories[idx] = {
			...categories[idx],
			...(data as Partial<CategoryItem>)
		};
	} else {
		categories.push(data as unknown as CategoryItem);
	}

	return { items: categories };
};

const deleteData: CategoryFormatFunction = (data, current) => {
	const categories = [...current];

	const idx = categories.findIndex((item: CategoryItem) => item.id === data.id);

	if (idx !== -1) {
		categories.splice(idx, 1);
	}

	return { items: categories };
};
