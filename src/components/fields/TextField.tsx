import { useFormContext } from 'react-hook-form';
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
 * A text input field component that integrates with react-hook-form.
 * Supports visibility control, validation, error display, and optional icons.
 */
export const TextField = ({ data, values, hiddenValue }: FieldProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext();
	const initialValue = values?.[data.name] ?? '';

	// Determine if field should be visible
	const visible = useFieldVisibility(data.hidden, hiddenValue, data.name);

	if (!visible) return null;

	return (
		<ListItem
			sx={{
				...(errors[data.name] && {
					bgcolor: (theme) => alpha(theme.palette.error.main, 0.03)
				}),
				...(data.type === 'hidden' && { display: 'none' })
			}}
		>
			{data.icon && (
				<ListItemIcon>
					<Icon icon={data.icon} />
				</ListItemIcon>
			)}

			<FormControl fullWidth>
				<InputBase
					placeholder={data.label}
					{...(data.type === 'hidden' && { type: 'hidden' })}
					{...register(data.name, {
						required: data.required,
						value: initialValue
					})}
				/>
			</FormControl>

			{errors[data.name] && (
				<ListItemIcon sx={{ mr: 0 }}>
					<Icon error />
				</ListItemIcon>
			)}
		</ListItem>
	);
};
