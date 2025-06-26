import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import * as Icons from '@tabler/icons-react';
import {
	RadioGroup,
	FormControlLabel,
	Radio,
	FormControl,
	ListItem,
	FormHelperText
} from '@mui/material';

type TablerIconsType = keyof typeof Icons;

interface RadioFieldData {
	name: string;
	type: string;
	label?: string;
	choices?: { name: string; value: number }[];
	icon?: TablerIconsType;
	hidden?: number;
	required?: boolean;
}

interface RadioFieldProps {
	data: RadioFieldData;
	values: Record<string, string>;
	setDisabled: (disabled: boolean) => void;
}

export const RadioField: FC<RadioFieldProps> = ({ data, values }) => {
	const {
		register,
		formState: { errors }
	} = useFormContext();

	const initialValue =
		typeof values[data.name] !== 'undefined'
			? values[data.name]
			: data.choices && data.choices.length > 0
			? data.choices[0].value
			: '';

	return (
		<ListItem sx={{ ...(data.type === 'hidden' && { display: 'none' }) }}>
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
								control={
									<Radio
										{...register(data.name, { required: data.required })}
									/>
								}
								key={index}
								label={item.name}
								value={item.value}
							/>
						))}
				</RadioGroup>
				{errors[data.name] && (
					<FormHelperText error>Ce champ est obligatoire</FormHelperText>
				)}
			</FormControl>
		</ListItem>
	);
};
