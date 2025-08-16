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

import { FieldProps } from 'types';
import { isFieldVisible } from 'utils';
import { Icon } from 'components';

export const AmountField: FC<FieldProps> = ({ data, hiddenValue, values }) => {
	const {
		control,
		formState: { errors },
		unregister
	} = useFormContext();
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const shouldShow = isFieldVisible(data.hidden, hiddenValue);
		setVisible(shouldShow);

		if (!shouldShow) {
			unregister(data.name);
		}
	}, [data, hiddenValue, unregister]);

	if (!visible) return null;

	const hasError = Boolean(errors[data.name]);
	const defaultValue = values?.[data.name] ?? '';

	return (
		<ListItem
			sx={{
				...(hasError && {
					bgcolor: (theme) => alpha(theme.palette.error.main, 0.03)
				})
			}}
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
							placeholder={data.label || '0$'}
							customInput={Input}
							decimalScale={2}
							decimalSeparator=","
							thousandSeparator=" "
							fixedDecimalScale
							suffix={'$'}
							allowNegative={false}
							inputProps={{ inputMode: 'decimal' }}
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
