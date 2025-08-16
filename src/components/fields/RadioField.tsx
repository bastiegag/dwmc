import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
	FormControl,
	FormControlLabel,
	ListItem,
	Radio,
	RadioGroup
} from '@mui/material';

import { FieldProps } from 'types';
import { isFieldVisible } from 'utils';

export const RadioField: FC<FieldProps> = ({ data, values, hiddenValue }) => {
	const { register, unregister } = useFormContext();
	const initialValue = values?.[data.name] ?? data.choices?.[0]?.value ?? '';
	const [show, setShow] = useState(true);

	useEffect(() => {
		if (isFieldVisible(data.hidden, hiddenValue)) {
			setShow(true);
		} else {
			unregister(data.name);
			setShow(false);
		}
	}, [hiddenValue, data, unregister]);

	if (!show) return null;

	return (
		<ListItem>
			<FormControl fullWidth>
				<RadioGroup
					row
					defaultValue={initialValue}
					sx={{ justifyContent: 'center' }}
				>
					{data.choices &&
						data.choices.length > 0 &&
						data.choices.map((item, index) => (
							<FormControlLabel
								control={<Radio {...register(data.name)} />}
								key={index}
								label={item.name}
								value={item.value}
							/>
						))}
				</RadioGroup>
			</FormControl>
		</ListItem>
	);
};
