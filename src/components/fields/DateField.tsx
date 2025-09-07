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

	const getInitialDate = () => {
		const rawValue = values?.[data.name];

		if (rawValue) {
			if (typeof rawValue === 'string' || typeof rawValue === 'number') {
				const parsedDate = dayjs(rawValue);
				return parsedDate.isValid() ? parsedDate : dayjs();
			}
			if (dayjs.isDayjs(rawValue)) {
				return rawValue;
			}
		}

		return current.getMonth() !== dayjs().month()
			? dayjs(new Date(current.getFullYear(), current.getMonth(), 1))
			: dayjs();
	};

	const [date, setDate] = useState(getInitialDate());
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
			? date < max
				? date.add(1, 'day')
				: date
			: date > min
			? date.subtract(1, 'day')
			: date;

		setDate(newDate);
		setValue(data.name, newDate);
	};

	if (!show) return null;

	return (
		<ListItem>
			{data.icon && (
				<ListItemIcon onClick={() => setOpen(true)}>
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
