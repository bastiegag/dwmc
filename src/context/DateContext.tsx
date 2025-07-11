import { createContext } from 'react';
import { Dayjs } from 'dayjs';

export interface IDateContext {
	current: Date;
	setCurrent: React.Dispatch<React.SetStateAction<IDateContext['current']>>;
	month: number;
	year: number;
	min: Dayjs;
	max: Dayjs;
	label: string;
}

export const DateContext = createContext<IDateContext | null>(null);
