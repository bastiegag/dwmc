/**
 * Format price
 * @param {float} price
 * @returns
 */
export const formatPrice = (price: number) => {
	if (typeof price == 'undefined') return;

	const newPrice = new Intl.NumberFormat('fr-CA', {
		style: 'currency',
		currency: 'CAD',
		minimumFractionDigits: 2
	}).format(price);

	return newPrice;
};

/**
 * Format price to float
 * @param {string} price
 */
export const formatPriceToFloat = (price: string) => {
	if (typeof price == 'undefined') return;
	if (typeof price == 'number') return price;

	const newPrice = price.replace(',', '.');

	return parseFloat(newPrice.replace(/[^\d.-]/g, ''));
};
