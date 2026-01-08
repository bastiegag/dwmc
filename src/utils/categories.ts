import type { CategoryItem } from 'types';

export const setColor = (categories: CategoryItem[]): CategoryItem[] => {
	const sections = categories.filter((item) => item.type === 'section');
	const sectionMap = new Map(sections.map((s) => [s.id, s]));
	const defaultSection = sectionMap.get('default');

	const result = categories.map((cat) => {
		if (cat.type === 'section') {
			return { ...cat, type: 'section' as const };
		}
		const section = cat.section
			? sectionMap.get(cat.section) || defaultSection
			: defaultSection;
		return {
			color: section?.color,
			id: cat.id,
			name: cat.name,
			type: 'category' as const,
			icon: cat.icon,
			section: section?.id
		};
	});

	return result;
};

export const getCategory = (
	data: CategoryItem[],
	id: string = 'subdefault'
): CategoryItem | undefined => {
	return (
		data.find((category) => category.id === id) ||
		data.find((category) => category.id === 'subdefault')
	);
};
