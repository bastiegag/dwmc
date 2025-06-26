import dayjs from 'dayjs';

const days = [
	'Dimanche',
	'Lundi',
	'Mardi',
	'Mercredi',
	'Jeudi',
	'Vendredi',
	'Samedi'
];
const months = [
	'Janvier',
	'Février',
	'Mars',
	'Avril',
	'Mai',
	'Juin',
	'Juillet',
	'Août',
	'Septembre',
	'Octobre',
	'Novembre',
	'Décembre'
];
const sMonths = [
	'Jan',
	'Fév',
	'Mar',
	'Avr',
	'Mai',
	'Jui',
	'Jul',
	'Aoû',
	'Sep',
	'Oct',
	'Nov',
	'Déc'
];

/**
 * Format date title
 * @param {string} date
 * @returns
 */
export const formatDateTitle = (date: Date) => {
	const dateObj = new Date(date);
	const weekDay = dateObj.getDay();
	const day = dateObj.getDate();
	const month = dateObj.getMonth();

	const newDate = `${days[weekDay]}, ${day} ${sMonths[month]}`;

	return newDate;
};

/**
 * Format short date
 * @param {string} date
 * @returns
 */
export const formatShortDate = (date: Date) => {
	const dateObj = new Date(date);
	const day = dateObj.getDate();
	const month = dateObj.getMonth();

	const newDate = `${day} ${sMonths[month]}`;

	return newDate;
};

/**
 * Format date switcher
 * @param {string} date
 * @returns
 */
export const formatDateSwitcher = (date: Date) => {
	const newDate = new Date(date);
	const month = newDate.getMonth();
	const year = newDate.getFullYear();

	return {
		current: date,
		label: `${months[month]} ${year}`,
		selector: month + 1,
		min: dayjs(new Date(year, 0, 1)),
		max: dayjs(new Date(year, 11, 31))
	};
};

/**
 * Get number of days in a month
 */
export const getNumDays = (y: number, m: number) => new Date(y, m, 0).getDate();
