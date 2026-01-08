import { useFormContext } from 'react-hook-form';
import {
	FormControl,
	FormControlLabel,
	ListItem,
	ListItemIcon,
	Switch
} from '@mui/material';

import type { FieldProps } from 'types';
import { useFieldVisibility } from 'hooks';
import { Icon } from 'components';

/**
 * SwitchField is a form field component that renders a Material-UI Switch
 * integrated with react-hook-form. It supports conditional visibility,
 * optional icon display, and label placement.
 */
export const SwitchField = ({ data, values, hiddenValue }: FieldProps) => {
	const { register } = useFormContext();
	// Initial switch value from form or default
	const initialValue = values?.[data.name] ?? false;

	// Check if field should be visible based on conditional rules
	const visible = useFieldVisibility(data.hidden, hiddenValue, data.name);

	if (!visible) return null;

	return (
		<ListItem>
			{data.icon && (
				<ListItemIcon>
					<Icon icon={data.icon} />
				</ListItemIcon>
			)}
			<FormControl fullWidth>
				<FormControlLabel
					control={
						<Switch
							defaultChecked={Boolean(initialValue)}
							{...register(data.name)}
						/>
					}
					label={data.label}
					labelPlacement="start"
					sx={{ ml: 0, justifyContent: 'space-between' }}
				/>
			</FormControl>
		</ListItem>
	);
};
