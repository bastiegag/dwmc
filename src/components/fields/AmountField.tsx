import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import * as Icons from '@tabler/icons-react';
import { NumericFormat } from 'react-number-format';
import {
	Input,
	FormControl,
	ListItem,
	ListItemIcon,
	FormHelperText,
	Avatar
} from '@mui/material';

type TablerIconsType = keyof typeof Icons;

interface AmountFieldData {
	name: string;
	type: string;
	label?: string;
	icon?: TablerIconsType;
	hidden?: number;
	required?: boolean;
}

interface AmountFieldProps {
	data: AmountFieldData;
	values: Record<string, string>;
	setDisabled: (disabled: boolean) => void;
}

export const AmountField: FC<AmountFieldProps> = ({
	data,
	values,
	setDisabled
}) => {
	const { control } = useFormContext();

	const IconComponent = data.icon ? (Icons[data.icon] as FC) : null;
	const initialValue =
		typeof values[data.name] !== 'undefined' ? values[data.name] : '';

	return (
		<ListItem sx={{ ...(data.type === 'hidden' && { display: 'none' }) }}>
			{IconComponent && (
				<ListItemIcon>
					<Avatar>
						<IconComponent />
					</Avatar>
				</ListItemIcon>
			)}

			<Controller
				name={data.name}
				control={control}
				rules={{
					required: data.required
				}}
				defaultValue={initialValue}
				render={({ field: { onChange, value }, fieldState: { invalid } }) => (
					<FormControl fullWidth>
						<NumericFormat
							value={value}
							onChange={onChange}
							onValueChange={({ floatValue }) => {
								if (data.required) {
									if (typeof floatValue === 'undefined') {
										setDisabled(true);
									} else {
										setDisabled(false);
									}
								}
							}}
							placeholder="0 $"
							allowedDecimalSeparators={['.']}
							allowNegative={false}
							customInput={Input}
							{...{ inputProps: { inputMode: 'decimal' } }}
							decimalScale={2}
							decimalSeparator=","
							thousandSeparator=" "
							fixedDecimalScale
							suffix={' $'}
							sx={{
								...(!data.icon && {
									fontSize: 32,
									fontWeight: 500,
									input: { textAlign: 'center', padding: 0 }
								})
							}}
						/>
						{invalid && (
							<FormHelperText
								error
								sx={{ textAlign: data.icon ? 'left' : 'center' }}
							>
								Ce champ est obligatoire
							</FormHelperText>
						)}
					</FormControl>
				)}
			/>
		</ListItem>
	);
};
