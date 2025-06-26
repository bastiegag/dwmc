import {
	Categories,
	CategoriesItem,
	SecondaryCategories
} from 'hooks/useCategories';

export const getSetColor = (data: Categories[]): CategoriesItem => {
	let output: CategoriesItem = { primary: [], secondary: [] };

	// Since we expect only one categories document per user,
	// we'll use the first one if it exists
	const category = data[0];
	if (category) {
		const primary = category.primary.map((item) => ({
			color: item.color,
			id: item.id,
			name: item.name
		}));

		const secondary = category.secondary.map((item) => {
			const primaryCategory = category.primary.find(
				(p) => p.id === item.section
			);
			return {
				id: item.id,
				icon: item.icon,
				name: item.name,
				section: item.section,
				color: primaryCategory?.color
			};
		});

		output = { primary, secondary };
	}

	return output;
};

export const getCategory = (
	data: CategoriesItem,
	id?: string
): SecondaryCategories | undefined => {
	if (!id) return;

	const category = data.secondary.find((cat) => cat.id === id);
	if (!category) return;

	return category;
};
