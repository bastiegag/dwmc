import { useCallback, useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { FormProps, FieldData, CategoryItem } from 'types';
import { useDataProvider } from 'hooks';
import { Drawer, Form } from 'components';

const BASE_FIELDS: FieldData[] = [
	{
		name: 'id',
		type: 'hidden'
	},
	{
		name: 'type',
		type: 'radio',
		choices: [
			{ name: 'Category', value: 'category' },
			{ name: 'Section', value: 'section' }
		]
	},
	{
		name: 'name',
		type: 'text',
		label: 'Name',
		icon: 'IconTag',
		required: true
	},
	{
		name: 'color',
		type: 'color',
		label: 'Color',
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

export const CategoryForm = ({ open, setOpen, values, anchor }: FormProps) => {
	const { categories, rawCategories } = useDataProvider();
	const methods = useForm({
		mode: 'onBlur',
		defaultValues: values
	});

	useEffect(() => {
		if (open && values) methods.reset(values);
	}, [open, values, methods]);

	const fields = useMemo(() => {
		const sectionChoices = (categories ?? [])
			.filter((cat) => cat.type === 'section')
			.map((cat) => ({ name: cat.name, value: cat.id }));
		const dynamicFields = [...BASE_FIELDS];
		dynamicFields[4] = { ...dynamicFields[4], choices: sectionChoices };
		return dynamicFields;
	}, [categories]);

	const formatData = useCallback<CategoryFormatFunction>((data, current) => {
		const idx = current.findIndex((item: CategoryItem) => item.id === data.id);
		if (idx !== -1) {
			const updated = [...current];
			updated[idx] = { ...updated[idx], ...(data as Partial<CategoryItem>) };
			return { items: updated };
		}
		return { items: [...current, data as unknown as CategoryItem] };
	}, []);

	const deleteData = useCallback<CategoryFormatFunction>((data, current) => {
		return {
			items: current.filter((item: CategoryItem) => item.id !== data.id)
		};
	}, []);

	if (!categories) return null;
	return (
		<Drawer
			open={open}
			anchor={anchor}
			setOpen={setOpen}
			fullscreen
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
	);
};

type CategoryFormatFunction = (
	data: Record<string, unknown>,
	current: CategoryItem[]
) => Record<string, unknown>;
