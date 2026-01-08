import { useCallback, useMemo, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { IconButton, FormControl, ListItem, ListItemIcon } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { type Dayjs } from 'dayjs';

import type { FieldProps } from 'types';
import { useDate, useFieldVisibility } from 'hooks';
import { Icon } from 'components';

/**
 * DateField - A form field for selecting and adjusting dates with a date picker and navigation buttons.
 * Supports min/max date constraints and custom formatting.
 */
export const DateField = ({ data, values, hiddenValue }: FieldProps) => {
	const {
		control,
		formState: { errors },
		setValue
	} = useFormContext();
	const { min, max, current } = useDate();

	// Compute initial date value from form values or fallback to current month
	const initialDate = useMemo(() => {
		const rawValue = values?.[data.name];
		if (rawValue) {
			if (typeof rawValue === 'string' || typeof rawValue === 'number') {
				const parsedDate = dayjs(rawValue);
				return parsedDate.isValid() ? parsedDate : dayjs();
			}
			if (dayjs.isDayjs(rawValue)) return rawValue;
		}
		return current.getMonth() !== dayjs().month()
			? dayjs(new Date(current.getFullYear(), current.getMonth(), 1))
			: dayjs();
	}, [values, data.name, current]);

	// Local state for date picker and drawer
	const [date, setDate] = useState(initialDate);
	const [open, setOpen] = useState(false);

	// Check if field should be visible based on conditional rules
	const visible = useFieldVisibility(data.hidden, hiddenValue, data.name);

	// Open the date picker drawer
	const handleOpen = useCallback(() => setOpen(true), []);

	// Close the date picker drawer
	const handleClose = useCallback(() => setOpen(false), []);

	// Increment or decrement the date by one day, respecting min/max
	const handleDateChange = useCallback(
		(add: boolean) => {
			const newDate = add
				? date < max
					? date.add(1, 'day')
					: date
				: date > min
				? date.subtract(1, 'day')
				: date;
			setDate(newDate);
			setValue(data.name, newDate);
		},
		[date, max, min, data.name, setValue]
	);

	// Handle date picker value change
	const handleChange = useCallback(
		(onChange: (value: Dayjs | null) => void) => (newValue: Dayjs | null) => {
			onChange(newValue);
			if (newValue) setDate(newValue);
		},
		[]
	);

	if (!visible) return null;

	return (
		<ListItem>
			{data.icon && (
				<ListItemIcon onClick={handleOpen}>
					<Icon icon={data.icon} error={Boolean(errors[data.name])} />
				</ListItemIcon>
			)}
			<Controller
				name={data.name}
				control={control}
				defaultValue={date}
				render={({ field: { onChange, value } }) => (
					<FormControl fullWidth>
						<MobileDatePicker
							closeOnSelect
							format="dddd, D MMM YYYY"
							onChange={handleChange(onChange)}
							onClose={handleClose}
							open={open}
							minDate={min}
							maxDate={max}
							sx={{ input: { textTransform: 'capitalize' } }}
							value={
								value ? (dayjs.isDayjs(value) ? value : dayjs(value)) : date
							}
						/>
					</FormControl>
				)}
			/>
			<IconButton
				disabled={date <= min}
				onClick={() => handleDateChange(false)}
			>
				<IconChevronLeft />
			</IconButton>
			<IconButton disabled={date >= max} onClick={() => handleDateChange(true)}>
				<IconChevronRight />
			</IconButton>
		</ListItem>
	);
};
