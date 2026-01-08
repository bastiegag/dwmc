import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import {
	FormControl,
	FormControlLabel,
	ListItem,
	Radio,
	RadioGroup
} from '@mui/material';

import type { FieldProps } from 'types';
import { useFieldVisibility } from 'hooks';

/**
 * RadioField - A form field for selecting one option from a set of radio choices.
 * Supports conditional visibility and default value selection.
 */
export const RadioField = ({ data, values, hiddenValue }: FieldProps) => {
	const { register } = useFormContext();
	// Determine initial value from form values or first choice
	const initialValue = values?.[data.name] ?? data.choices?.[0]?.value ?? '';

	// Check if field should be visible based on conditional rules
	const visible = useFieldVisibility(data.hidden, hiddenValue, data.name);

	// Memoize radio options for performance
	const radioOptions = useMemo(
		() =>
			data.choices?.map((item) => (
				<FormControlLabel
					control={<Radio {...register(data.name)} />}
					key={item.value}
					label={item.name}
					value={item.value}
				/>
			)),
		[data.choices, data.name, register]
	);

	if (!visible) return null;

	return (
		<ListItem>
			<FormControl fullWidth>
				<RadioGroup
					row
					defaultValue={initialValue}
					sx={{ justifyContent: 'center' }}
				>
					{radioOptions}
				</RadioGroup>
			</FormControl>
		</ListItem>
	);
};
