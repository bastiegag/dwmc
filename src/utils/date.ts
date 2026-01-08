import dayjs, { Dayjs } from 'dayjs';

const DAYS = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
] as const;

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
] as const;

const SHORT_MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
] as const;

export const formatDateTitle = (date: string): string => {
	const dateObj = dayjs(date);
	return `${DAYS[dateObj.day()]}, ${dateObj.date()} ${
		SHORT_MONTHS[dateObj.month()]
	}`;
};

export const formatShortDate = (date: string): string => {
	const dateObj = dayjs(date);
	return `${dateObj.date()} ${SHORT_MONTHS[dateObj.month()]}`;
};

interface DateSwitcherResult {
	current: Date;
	month: number;
	year: number;
	min: Dayjs;
	max: Dayjs;
	label: string;
}

export const formatDateSwitcher = (date: Date): DateSwitcherResult => {
	const dateObj = dayjs(date);
	const month = dateObj.month();
	const year = dateObj.year();
	const numDays = getNumDays(year, month + 1);

	return {
		current: dateObj.toDate(),
		month: month + 1,
		year,
		min: dayjs(new Date(year, month, 1)),
		max: dayjs(new Date(year, month, numDays)),
		label: `${MONTHS[month]} ${year}`
	};
};

export const getNumDays = (y: number, m: number): number =>
	dayjs(`${y}-${String(m).padStart(2, '0')}-01`).daysInMonth();
