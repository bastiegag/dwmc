import { CategoryItem } from 'hooks/useCategories';

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
			const color =
				primary.find((p) => p.id === cat.section)?.color || cat.color;

			return {
				color: color,
				id: cat.id,
				name: cat.name,
				type: 'category',
				icon: cat.icon,
				section: cat.section
			};
		});

	return [...primary, ...secondary];
};

export const getCategory = (
	data: CategoryItem[],
	id: string | number | boolean = 'default'
): CategoryItem | undefined => {
	const category = data.find((category) => category.id === id);
	if (!category) return;

	return category;
};
