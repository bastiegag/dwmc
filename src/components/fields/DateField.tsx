import { FC, useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { IconButton, FormControl, ListItem, ListItemIcon } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

import { FieldProps } from './types';
//import { useDate } from 'hooks';
import { isFieldVisible } from 'utils';
import { Icon } from 'components';

export const DateField: FC<FieldProps> = ({ data, values, hiddenValue }) => {
	const {
		control,
		formState: { errors },
		setValue,
		unregister
	} = useFormContext();
	//const { min, max } = useDate();

	const rawValue = values?.[data.name];
	const initialValue = dayjs(
		typeof rawValue === 'string' ||
			typeof rawValue === 'number' ||
			dayjs.isDayjs(rawValue)
			? rawValue
			: undefined
	);
	const [date, setDate] = useState(initialValue);
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(true);

	useEffect(() => {
		if (isFieldVisible(data.hidden, hiddenValue)) {
			setShow(true);
		} else {
			unregister(data.name);
			setShow(false);
		}
	}, [hiddenValue, data, unregister]);

	const handleDateChange = (add: boolean) => {
		const newDate = add
			? dayjs(date).add(1, 'day')
			: dayjs(date).subtract(1, 'day');

		setDate(newDate);
		setValue(data.name, newDate);
	};

	return (
		show && (
			<ListItem>
				{data.icon && (
					<ListItemIcon onClick={() => setOpen(true)}>
						<Icon icon={data.icon} error={Boolean(errors[data.name])} />
					</ListItemIcon>
				)}

				<Controller
					name={data.name}
					control={control}
					defaultValue={initialValue}
					render={({ field: { onChange, value } }) => (
						<FormControl fullWidth>
							<MobileDatePicker
								closeOnSelect={true}
								format="dddd, D MMM YYYY"
								onChange={(newValue: Dayjs | null) => {
									onChange(newValue);
									if (newValue) setDate(newValue);
								}}
								onClose={() => setOpen(false)}
								open={open}
								//minDate={min}
								//maxDate={max}
								sx={{ input: { textTransform: 'capitalize' } }}
								value={value as Dayjs | null}
							/>
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
		)
	);
};
