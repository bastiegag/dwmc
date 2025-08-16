import { CategoryItem } from 'types';

export const setColor = (categories: CategoryItem[]) => {
	const primary = categories
		.filter((item) => item.type == 'section')
		.map((cat) => ({
			color: cat.color,
			id: cat.id,
			name: cat.name,
			type: 'section'
		}));

	const secondary = categories
		.filter((item) => item.type == 'category')
		.map((cat) => {
			let section;

			if (primary.find((p) => p.id === cat.section)) {
				section = primary.find((p) => p.id === cat.section);
			} else {
				section = primary.find((p) => p.id === 'default');
			}

			return {
				color: section?.color,
				id: cat.id,
				name: cat.name,
				type: 'category',
				icon: cat.icon,
				section: section?.id
			};
		});

	return [...primary, ...secondary];
};

export const getCategory = (
	data: CategoryItem[],
	id: string = 'subdefault'
): CategoryItem | undefined => {
	const category = data.find((category) => category.id === id);

	if (!category) {
		return data.find((category) => category.id === 'subdefault');
	}

	return category;
};
