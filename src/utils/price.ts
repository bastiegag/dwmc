const priceFormatter = new Intl.NumberFormat('en-CA', {
	style: 'currency',
	currency: 'CAD',
	minimumFractionDigits: 2
});

export const formatPrice = (price: number): string | undefined => {
	if (typeof price === 'undefined') return;
	return priceFormatter.format(price);
};

export const formatPriceToFloat = (
	price: string | number
): number | undefined => {
	if (typeof price === 'undefined') return;
	if (typeof price === 'number') return price;

	const normalizedPrice = price.replace(',', '.');
	return parseFloat(normalizedPrice.replace(/[^\d.-]/g, ''));
};
