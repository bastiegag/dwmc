import { FC, ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import * as Icons from '@tabler/icons-react';
import {
	Input,
	FormControl,
	ListItem,
	ListItemIcon,
	FormHelperText,
	Avatar
} from '@mui/material';

type TablerIconsType = keyof typeof Icons;

interface TextFieldData {
	name: string;
	type: string;
	label?: string;
	icon?: TablerIconsType;
	hidden?: number;
	required?: boolean;
}

interface TextFieldProps {
	data: TextFieldData;
	values: Record<string, string>;
	setDisabled: (disabled: boolean) => void;
}

export const TextField: FC<TextFieldProps> = ({
	data,
	values,
	setDisabled
}) => {
	const {
		register,
		formState: { errors }
	} = useFormContext();

	const IconComponent = data.icon ? (Icons[data.icon] as FC) : null;
	const initialValue =
		typeof values[data.name] !== 'undefined' ? values[data.name] : '';

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (data.required) {
			if (event.target.value !== '') {
				setDisabled(false);
			} else {
				setDisabled(true);
			}
		}
	};

	return (
		<ListItem sx={{ ...(data.type === 'hidden' && { display: 'none' }) }}>
			{IconComponent && (
				<ListItemIcon>
					<Avatar>
						<IconComponent />
					</Avatar>
				</ListItemIcon>
			)}

			<FormControl error fullWidth onChange={handleChange}>
				<Input
					defaultValue={initialValue}
					placeholder={data.label}
					{...register(data.name, { required: data.required })}
				/>
				{errors[data.name] && (
					<FormHelperText error>Ce champ est obligatoire</FormHelperText>
				)}
			</FormControl>
		</ListItem>
	);
};
