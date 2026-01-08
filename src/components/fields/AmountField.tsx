import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import {
	alpha,
	FormControl,
	InputBase,
	ListItem,
	ListItemIcon
} from '@mui/material';

import type { FieldProps } from 'types';
import { useFieldVisibility } from 'hooks';
import { Icon } from 'components';

/**
 * AmountField - A formatted numeric input field for monetary amounts
 * with currency prefix, thousand separators, and decimal precision
 */
export const AmountField = ({ data, hiddenValue, values }: FieldProps) => {
	const {
		control,
		formState: { errors }
	} = useFormContext();

	// Check if field should be visible based on conditional rules
	const visible = useFieldVisibility(data.hidden, hiddenValue, data.name);
	if (!visible) return null;

	const hasError = !!errors[data.name];
	const defaultValue = values?.[data.name] ?? '';

	// Render with error styling if validation fails
	return (
		<ListItem
			sx={
				hasError
					? { bgcolor: (theme) => alpha(theme.palette.error.main, 0.03) }
					: undefined
			}
		>
			{data.icon && (
				<ListItemIcon>
					<Icon icon={data.icon} error={hasError} />
				</ListItemIcon>
			)}
			<Controller
				name={data.name}
				control={control}
				rules={{ required: data.required }}
				defaultValue={defaultValue}
				render={({ field: { onChange, value } }) => (
					<FormControl fullWidth>
						<NumericFormat
							value={value}
							onChange={onChange}
							placeholder={data.label || '$0'}
							customInput={InputBase}
							decimalScale={2}
							decimalSeparator=","
							thousandSeparator=" "
							fixedDecimalScale
							prefix="$"
							allowNegative={false}
							inputProps={{ inputMode: 'decimal' }}
							// When no icon: larger, centered styling for standalone amount input
							sx={
								!data.icon
									? {
											fontSize: 32,
											fontWeight: 500,
											input: { textAlign: 'center', padding: 0 }
									  }
									: undefined
							}
						/>
					</FormControl>
				)}
			/>
		</ListItem>
	);
};
