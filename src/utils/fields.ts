export const isFieldVisible = (
	valuesArray: string[] | undefined,
	value: string
): boolean => {
	if (!valuesArray || !value) {
		return true;
	}

	return !valuesArray.includes(value);
};
