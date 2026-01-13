import { createContext } from 'react';
import dayjs from 'dayjs';

import type { DateContextType } from 'types';

const now = new Date();
export const DateContext = createContext<DateContextType>({
	current: now,
	setCurrent: () => {},
	month: now.getMonth() + 1,
	year: now.getFullYear(),
	min: dayjs(new Date(now.getFullYear(), now.getMonth(), 1)),
	max: dayjs(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
	label: ''
});
