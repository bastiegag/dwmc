import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
	FormControl,
	FormControlLabel,
	ListItem,
	ListItemIcon,
	Switch
} from '@mui/material';

import { FieldProps } from './types';
import { isFieldVisible } from 'utils';
import { Icon } from 'components';

export const SwitchField: FC<FieldProps> = ({ data, values, hiddenValue }) => {
	const { register, unregister } = useFormContext();
	const initialValue = values[data.name] ?? false;
	const [show, setShow] = useState(true);

	useEffect(() => {
		if (isFieldVisible(data.hidden, hiddenValue)) {
			setShow(true);
		} else {
			unregister(data.name);
			setShow(false);
		}
	}, [hiddenValue, data, unregister]);

	return (
		show && (
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
		)
	);
};
