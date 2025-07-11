import { FC, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import {
	alpha,
	FormControl,
	Input,
	ListItem,
	ListItemIcon
} from '@mui/material';

import { FieldProps } from './types';
import { isFieldVisible } from 'utils';
import { Icon } from 'components';

export const AmountField: FC<FieldProps> = ({ data, hiddenValue, values }) => {
	const {
		control,
		formState: { errors },
		unregister
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

	return (
		show && (
			<ListItem
				sx={{
					...(errors[data.name] && {
						bgcolor: (theme) => alpha(theme.palette.error.main, 0.03)
					})
				}}
			>
				{data.icon && (
					<ListItemIcon>
						<Icon icon={data.icon} error={Boolean(errors[data.name])} />
					</ListItemIcon>
				)}

				<Controller
					name={data.name}
					control={control}
					rules={{
						required: data.required
					}}
					defaultValue={initialValue}
					render={({ field: { onChange, value } }) => (
						<FormControl fullWidth>
							<NumericFormat
								value={value}
								onChange={onChange}
								placeholder={data.label ? data.label : '0$'}
								allowedDecimalSeparators={['.']}
								allowNegative={false}
								customInput={Input}
								{...{ inputProps: { inputMode: 'decimal' } }}
								decimalScale={2}
								decimalSeparator=","
								thousandSeparator=" "
								fixedDecimalScale
								suffix={'$'}
								sx={{
									...(!data.icon && {
										fontSize: 32,
										fontWeight: 500,
										input: { textAlign: 'center', padding: 0 }
									})
								}}
							/>
						</FormControl>
					)}
				/>
			</ListItem>
		)
	);
};
