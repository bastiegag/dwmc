import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { isFieldVisible } from 'utils';

export const useFieldVisibility = (
	hidden: string[] | undefined,
	hiddenValue: string | undefined,
	fieldName: string
) => {
	const { unregister } = useFormContext();

	const visible = useMemo(
		() => isFieldVisible(hidden, hiddenValue),
		[hidden, hiddenValue]
	);

	useEffect(() => {
		if (!visible) {
			unregister(fieldName);
		}
	}, [visible, unregister, fieldName]);

	return visible;
};
