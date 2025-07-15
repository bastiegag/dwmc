import React, { FC, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconChevronDown, IconCirclePlus, IconEdit } from '@tabler/icons-react';
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
import { v4 as uuidv4 } from 'uuid';

import { FieldProps } from './types';
import { useCategories } from 'hooks';
import { CategoryItem } from 'hooks/useCategories';
import { getCategory, isFieldVisible } from 'utils';
import { Drawer, Icon, ListSection, ListChoice } from 'components';
import { CategoryForm } from 'components/forms';

export const CategoryField: FC<FieldProps> = ({
	data,
	hiddenValue,
	values
}) => {
	const { register, setValue, unregister } = useFormContext();
	const initialValue = values?.[data.name] ?? 'subdefault';
	const { data: categories } = useCategories();
	const [category, setCategory] = useState<CategoryItem | null>(null);
	const [open, setOpen] = useState(false);
	const [openForm, setOpenForm] = useState(false);
	const [show, setShow] = useState(true);

	useEffect(() => {
		if (isFieldVisible(data.hidden, hiddenValue)) {
			setShow(true);
		} else {
			unregister(data.name);
			setShow(false);
		}
	}, [hiddenValue, data, unregister]);

	useEffect(() => {
		const found = categories ? getCategory(categories, initialValue) : null;
		setCategory(found ?? null);
	}, [categories, initialValue]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = (id: string | number) => {
		const newCategory = categories ? getCategory(categories, id) : null;
		setCategory(newCategory ?? null);
		setValue(data.name, id);
		setOpen(false);
	};

	let list: React.ReactElement[] = [];
	if (categories) {
		list = categories
			.filter((item) => item.type == 'section')
			.map((item) => (
				<ListSection key={item.id} title={item.name}>
					{categories
						.filter((sub) => sub.section == item.id)
						.map((cat) => {
							const selected =
								category && category.id === cat.id ? true : false;
							const data = {
								id: cat.id,
								name: cat.name,
								icon: cat.icon,
								color: cat.color
							};
							return (
								<ListChoice
									key={cat.id}
									data={data}
									selected={selected}
									handleClose={handleClose}
								/>
							);
						})}
				</ListSection>
			));
	}

	return (
		show &&
		category && (
			<>
				<ListItem onClick={handleOpen}>
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
							<IconButton>
								<IconEdit />
							</IconButton>
							<IconButton onClick={() => setOpenForm(true)}>
								<IconCirclePlus />
							</IconButton>
						</Stack>
					}
				>
					<List>{list}</List>
				</Drawer>

				<CategoryForm
					open={openForm}
					values={{ id: uuidv4() }}
					setOpen={setOpenForm}
					anchor="right"
					title="Add category"
				/>
			</>
		)
	);
};
