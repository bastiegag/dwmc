export const isFieldVisible = (
	valuesArray: string[] | undefined,
	value: string
): boolean => !valuesArray || !value || !valuesArray.includes(value);
