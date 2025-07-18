import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
	alpha,
	FormControl,
	Input,
	ListItem,
	ListItemIcon
} from '@mui/material';

import { FieldProps } from 'types';
import { isFieldVisible } from 'utils';
import { Icon } from 'components';

export const TextField: FC<FieldProps> = ({ data, values, hiddenValue }) => {
	const {
		register,
		unregister,
		formState: { errors }
	} = useFormContext();
	const initialValue = values?.[data.name] ?? '';
	const [show, setShow] = useState(true);

	useEffect(() => {
		if (isFieldVisible(data.hidden, hiddenValue)) {
			setShow(true);
		} else {
			unregister(data.name);
			setShow(false);
		}
	}, [hiddenValue, data, unregister]);

	// Debug log to check initial values
	useEffect(() => {
		if (data.name === 'id' || data.name === 'note') {
			console.log(`Initial value for ${data.name}:`, initialValue);
		}
	}, [data.name, initialValue]);

	return (
		show && (
			<ListItem
				sx={{
					...(errors[data.name] && {
						bgcolor: (theme) => alpha(theme.palette.error.main, 0.03)
					}),
					...(data.type == 'hidden' && { display: 'none' })
				}}
			>
				{data.icon && (
					<ListItemIcon>
						<Icon icon={data.icon} />
					</ListItemIcon>
				)}

				<FormControl fullWidth>
					<Input
						placeholder={data.label}
						{...(data.type == 'hidden' && { type: 'hidden' })}
						{...register(data.name, {
							required: data.required,
							value: initialValue
						})}
					/>
				</FormControl>

				{errors[data.name] && (
					<ListItemIcon sx={{ mr: 0 }}>
						<Icon error={true} />
					</ListItemIcon>
				)}
			</ListItem>
		)
	);
};
