import { createContext } from 'react';
import { Dayjs } from 'dayjs';

export interface IDateContext {
	current: Date;
	setCurrent: React.Dispatch<React.SetStateAction<IDateContext['current']>>;
	min: Dayjs;
	max: Dayjs;
	label: string;
	selector: number;
}

export const DateContext = createContext<IDateContext | null>(null);
