import { FC, useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { IconButton, FormControl, ListItem, ListItemIcon } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

import { FieldProps } from 'types';
import { useDate } from 'hooks';
import { isFieldVisible } from 'utils';
import { Icon } from 'components';

export const DateField: FC<FieldProps> = ({ data, values, hiddenValue }) => {
	const {
		control,
		formState: { errors },
		setValue,
		unregister
	} = useFormContext();
	const { min, max, current } = useDate();
	console.log('Current:', current.getMonth(), dayjs().month());

	const rawValue = values?.[data.name];
	// Improved date initialization - safely handle various date formats
	let initialValue;

	// Only process string and number values
	if (
		rawValue &&
		(typeof rawValue === 'string' || typeof rawValue === 'number')
	) {
		// Try to parse the date with dayjs
		const parsedDate = dayjs(rawValue);
		initialValue = parsedDate.isValid() ? parsedDate : dayjs();
	} else if (rawValue && dayjs.isDayjs(rawValue)) {
		// Handle dayjs objects directly
		initialValue = rawValue;
	} else {
		if (current.getMonth() !== dayjs().month()) {
			if (current.getFullYear() !== dayjs().year()) {
				initialValue = dayjs(
					new Date(current.getFullYear(), current.getMonth(), 1)
				);
			} else {
				initialValue = dayjs(new Date(dayjs().year(), current.getMonth(), 1));
			}
		} else {
			initialValue = dayjs();
		}
	}

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

	// Update local state when rawValue changes (form reset or initialization)
	useEffect(() => {
		if (rawValue) {
			try {
				// Handle only string or number types for dayjs parsing
				if (typeof rawValue === 'string' || typeof rawValue === 'number') {
					const newDate = dayjs(rawValue);
					if (newDate.isValid()) {
						setDate(newDate);
					}
				} else if (dayjs.isDayjs(rawValue)) {
					// If it's already a dayjs object, use it directly
					setDate(rawValue);
				}
			} catch (error) {
				console.error('Error parsing date:', error);
			}
		}
	}, [rawValue]);

	const handleDateChange = (add: boolean) => {
		const newDate = add
			? date < max
				? dayjs(date).add(1, 'day')
				: dayjs(date)
			: date > min
			? dayjs(date).subtract(1, 'day')
			: dayjs(date);

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
					render={({ field: { onChange, value } }) => {
						// Ensure we always have a valid dayjs value for the date picker
						const dateValue = value
							? dayjs.isDayjs(value)
								? value
								: dayjs(value)
							: initialValue;

						return (
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
									minDate={min}
									maxDate={max}
									sx={{ input: { textTransform: 'capitalize' } }}
									value={dateValue}
								/>
							</FormControl>
						);
					}}
				/>

				<IconButton
					disabled={date <= min}
					onClick={() => {
						handleDateChange(false);
					}}
				>
					<IconChevronLeft />
				</IconButton>
				<IconButton
					disabled={date >= max}
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
