import React, { FC, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import {
	IconChevronDown,
	IconCirclePlus,
	IconEdit,
	IconEditOff
} from '@tabler/icons-react';
import {
	FormControl,
	IconButton,
	Input,
	List,
	ListItem,
	ListItemIcon,
	Stack,
	Typography
} from '@mui/material';

import { FieldProps, CategoryItem, WalletItem, ItemType } from 'types';
import { useDataProvider } from 'hooks';
import { getCategory, isFieldVisible } from 'utils';
import { Drawer, Icon, ListSection, ListChoice } from 'components';
import { CategoryForm } from 'components/forms';

export const CategoryField: FC<FieldProps> = ({
	data,
	hiddenValue,
	values
}) => {
	const { register, setValue, unregister } = useFormContext();
	const initialValue =
		(values as Record<string, string>)[data.name] ?? 'subdefault';
	const { categories } = useDataProvider();
	const [category, setCategory] = useState<CategoryItem | null>(null);
	const [open, setOpen] = useState(false);
	const [openForm, setOpenForm] = useState(false);
	const [edit, setEdit] = useState(false);
	const [formValues, setFormValues] = useState<CategoryItem | null>(null);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const shouldShow = isFieldVisible(data.hidden, hiddenValue);
		setVisible(shouldShow);

		if (!shouldShow) {
			unregister(data.name);
		}
	}, [data, hiddenValue, unregister]);

	useEffect(() => {
		const found = categories ? getCategory(categories, initialValue) : null;
		setCategory(found ?? null);
	}, [categories, initialValue]);

	const handleClose = (id: string) => {
		const newCategory = categories ? getCategory(categories, id) : null;
		setCategory(newCategory ?? null);
		setValue(data.name, id);
		setOpen(false);
	};

	const handleEdit = (item: CategoryItem | WalletItem | ItemType) => {
		setFormValues(item as CategoryItem);
		setOpenForm(true);
	};

	let list: React.ReactElement[] = [];
	if (categories) {
		list = categories
			.filter((item) => item.type === 'section')
			.map((item) => (
				<ListSection
					key={item.id}
					data={item}
					edit={edit}
					handleEdit={handleEdit}
				>
					{categories
						.filter((sub) => sub.section === item.id)
						.map((cat) => {
							const selected = category?.id === cat.id;
							return (
								<ListChoice
									key={cat.id}
									data={cat}
									selected={selected}
									edit={edit}
									handleEdit={handleEdit}
									handleClose={handleClose}
								/>
							);
						})}
				</ListSection>
			));
	}

	if (!visible || !category) return null;

	return (
		<>
			<ListItem onClick={() => setOpen(true)}>
				<ListItemIcon>
					<Icon icon={category.icon} color={category.color} />
				</ListItemIcon>

				<FormControl error fullWidth>
					<Input
						type="hidden"
						defaultValue={initialValue}
						placeholder={data.label}
						{...register(data.name)}
					/>
					<Typography>
						{data.label} {category.name}
					</Typography>
				</FormControl>

				<IconButton>
					<IconChevronDown />
				</IconButton>
			</ListItem>

			<Drawer
				open={open}
				setOpen={setOpen}
				title={data.drawerTitle ?? 'Select'}
				action={
					<Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
						<IconButton
							onClick={() => {
								setEdit(!edit);
							}}
						>
							{edit ? <IconEditOff /> : <IconEdit />}
						</IconButton>
						<IconButton
							onClick={() => {
								setFormValues({
									id: crypto.randomUUID(),
									type: 'category',
									section: 'default',
									name: ''
								});
								setOpenForm(true);
							}}
						>
							<IconCirclePlus />
						</IconButton>
					</Stack>
				}
			>
				<List>{list}</List>
			</Drawer>

			<div onClick={(e) => e.stopPropagation()}>
				<CategoryForm
					open={openForm}
					values={
						formValues
							? {
									id: formValues.id,
									type: formValues.type,
									section: formValues.section ?? '',
									name: formValues.name,
									icon: formValues.icon ?? 'IconArchive',
									color: formValues.color ?? 'light'
							  }
							: undefined
					}
					setOpen={setOpenForm}
					anchor="right"
					title="Add category"
				/>
			</div>
		</>
	);
};
