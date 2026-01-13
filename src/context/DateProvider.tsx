import { useMemo, useState, type PropsWithChildren } from 'react';

import type { DateContextType } from 'types';
import { DateContext } from 'context';
import { formatDateSwitcher } from 'utils';

export const DateProvider = ({ children }: PropsWithChildren) => {
	const initialDate = formatDateSwitcher(new Date());
	const [current, setCurrent] = useState<DateContextType['current']>(
		initialDate.current
	);

	const { month, year, min, max, label } = useMemo(
		() => formatDateSwitcher(current),
		[current]
	);

	const value = useMemo(
		() => ({ current, setCurrent, month, year, min, max, label }),
		[current, month, year, min, max, label]
	);

	return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};
