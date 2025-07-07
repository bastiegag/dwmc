import { CategoryItem } from 'hooks/useCategories';

export const setColor = (categories: CategoryItem[]) => {
	const primary = categories
		.filter((item) => item.type == 0)
		.map((cat) => ({
			color: cat.color,
			id: cat.id,
			name: cat.name,
			type: 0
		}));

	const secondary = categories
		.filter((item) => item.type == 1)
		.map((cat) => {
			const color =
				primary.find((p) => p.id === cat.section)?.color || cat.color;

			return {
				color: color,
				id: cat.id,
				name: cat.name,
				type: 1,
				icon: cat.icon,
				section: cat.section
			};
		});

	return [...primary, ...secondary];
};

export const getCategory = (
	data: CategoryItem[],
	id: string | number = 'default'
): CategoryItem | undefined => {
	const category = data.find((category) => category.id === id);
	if (!category) return;

	return category;
};
