import { FC, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import * as Icons from '@tabler/icons-react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import {
	IconButton,
	FormControl,
	ListItem,
	ListItemIcon,
	FormHelperText
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

type TablerIconsType = keyof typeof Icons;

interface DateFieldData {
	name: string;
	type: string;
	label?: string;
	icon?: TablerIconsType;
	hidden?: number;
	required?: boolean;
}

interface DateFieldProps {
	data: DateFieldData;
	values: Record<string, string>;
	setDisabled: (disabled: boolean) => void;
}

export const DateField: FC<DateFieldProps> = ({ data, values }) => {
	const { control, setValue } = useFormContext();
	const IconComponent = data.icon ? (Icons[data.icon] as FC) : null;

	const localDate = localStorage.getItem('dwmcLastDate')
		? dayjs(localStorage.getItem('dwmcLastDate'))
		: dayjs();
	const initialValue =
		typeof values[data.name] !== 'undefined'
			? dayjs(values[data.name])
			: localDate;
	const [date, setDate] = useState<Dayjs>(initialValue);
	const [open, setOpen] = useState(false);

	const handleDateChange = (add: boolean) => {
		let newDate: Dayjs;

		if (add) {
			newDate = dayjs(date).add(1, 'day');
		} else {
			newDate = dayjs(date).subtract(1, 'day');
		}

		setDate(newDate);
		setValue(data.name, newDate);
	};

	return (
		<ListItem sx={{ ...(data.type === 'hidden' && { display: 'none' }) }}>
			{IconComponent && (
				<ListItemIcon>
					<IconButton onClick={() => setOpen(true)}>
						<IconComponent />
					</IconButton>
				</ListItemIcon>
			)}

			<Controller
				name={data.name}
				control={control}
				rules={{
					required: data.required
				}}
				defaultValue={date}
				render={({ field: { onChange, value }, fieldState: { invalid } }) => (
					<FormControl fullWidth>
						<MobileDatePicker
							closeOnSelect={true}
							format="dddd D MMM YYYY"
							onChange={(newValue: Dayjs | null) => {
								onChange(newValue);
								if (newValue) setDate(newValue);
							}}
							onClose={() => setOpen(false)}
							open={open}
							sx={{ input: { textTransform: 'capitalize' } }}
							value={value as Dayjs | null}
						/>
						{invalid && (
							<FormHelperText error>Ce champ est obligatoire</FormHelperText>
						)}
					</FormControl>
				)}
			/>

			<IconButton
				onClick={() => {
					handleDateChange(false);
				}}
			>
				<IconChevronLeft />
			</IconButton>
			<IconButton
				onClick={() => {
					handleDateChange(true);
				}}
			>
				<IconChevronRight />
			</IconButton>
		</ListItem>
	);
};
