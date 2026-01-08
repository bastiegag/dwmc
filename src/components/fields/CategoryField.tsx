import { useCallback, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import {
	IconChevronDown,
	IconCirclePlus,
	IconEdit,
	IconEditOff
} from '@tabler/icons-react';
import {
	FormControl,
	IconButton,
	InputBase,
	List,
	ListItem,
	ListItemIcon,
	Stack,
	Typography
} from '@mui/material';

import type { FieldProps, CategoryItem, ItemType } from 'types';
import { useDataProvider, useFieldVisibility } from 'hooks';
import { getCategory } from 'utils';
import { Drawer, Icon, ListSection, ListChoice } from 'components';
import { CategoryForm } from 'components/forms';

/**
 * CategoryField - A form field for selecting categories with support for sections,
 * editing existing categories, and creating new ones via a drawer interface
 */
export const CategoryField = ({ data, hiddenValue, values }: FieldProps) => {
	const { register, setValue, control } = useFormContext();
	const initialValue =
		(values as Record<string, string>)[data.name] ?? 'subdefault';
	const { categories } = useDataProvider();

	// State: drawer visibility, form visibility, edit mode, and form data
	const [open, setOpen] = useState(false);
	const [openForm, setOpenForm] = useState(false);
	const [edit, setEdit] = useState(false);
	const [formValues, setFormValues] = useState<CategoryItem | null>(null);

	// Watch current field value and determine visibility
	const currentValue = useWatch({
		control,
		name: data.name,
		defaultValue: initialValue
	});
	const visible = useFieldVisibility(data.hidden, hiddenValue, data.name);

	// Get the currently selected category object
	const category = useMemo(
		() => (categories ? getCategory(categories, currentValue) : null),
		[categories, currentValue]
	);

	// Handlers for drawer and form interactions
	const handleOpen = useCallback(() => setOpen(true), []);
	const handleClose = useCallback(
		(id: string) => {
			setValue(data.name, id);
			setOpen(false);
		},
		[data.name, setValue]
	);
	const handleEdit = useCallback((item: CategoryItem | ItemType) => {
		setFormValues(item as CategoryItem);
		setOpenForm(true);
	}, []);
	const toggleEdit = useCallback(() => setEdit((prev) => !prev), []);

	// Create a new category with default values
	const handleAddNew = useCallback(() => {
		setFormValues({
			id: crypto.randomUUID(),
			type: 'category',
			section: 'default',
			name: ''
		});
		setOpenForm(true);
	}, []);

	// Filter to get only section-type categories
	const sections = useMemo(
		() => categories?.filter((item) => item.type === 'section') ?? [],
		[categories]
	);

	// Build hierarchical list: sections with their child categories
	const list = useMemo(() => {
		if (!categories) return [];
		return sections.map((item) => (
			<ListSection
				key={item.id}
				data={item}
				edit={edit}
				handleEdit={handleEdit}
			>
				{categories
					.filter((sub) => sub.section === item.id)
					.map((cat) => (
						<ListChoice
							key={cat.id}
							data={cat}
							selected={category?.id === cat.id}
							edit={edit}
							handleEdit={handleEdit}
							handleClose={handleClose}
						/>
					))}
			</ListSection>
		));
	}, [sections, categories, category?.id, edit, handleEdit, handleClose]);

	// Drawer action buttons: toggle edit mode and add new category
	const drawerActions = useMemo(
		() => (
			<Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
				<IconButton onClick={toggleEdit}>
					{edit ? <IconEditOff /> : <IconEdit />}
				</IconButton>
				<IconButton onClick={handleAddNew}>
					<IconCirclePlus />
				</IconButton>
			</Stack>
		),
		[edit, toggleEdit, handleAddNew]
	);

	// Prepare form values with defaults for editing or creating categories
	const categoryFormValues = useMemo(
		() =>
			formValues
				? {
						id: formValues.id,
						type: formValues.type,
						section: formValues.section ?? '',
						name: formValues.name,
						icon: formValues.icon ?? 'IconArchive',
						color: formValues.color ?? 'light'
				  }
				: undefined,
		[formValues]
	);

	if (!visible || !category) return null;

	return (
		<>
			<ListItem onClick={handleOpen}>
				<ListItemIcon>
					<Icon icon={category.icon} color={category.color} />
				</ListItemIcon>
				<FormControl error fullWidth>
					<InputBase
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
				action={drawerActions}
			>
				<List>{list}</List>
			</Drawer>
			<div onClick={(e) => e.stopPropagation()}>
				<CategoryForm
					open={openForm}
					values={categoryFormValues}
					setOpen={setOpenForm}
					anchor="right"
					title="Add category"
				/>
			</div>
		</>
	);
};
