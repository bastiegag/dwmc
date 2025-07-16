import React, { useEffect, useMemo, useState } from 'react';

import { DateContextType } from 'types';
import { DateContext } from 'context';
import { formatDateSwitcher } from 'utils';

export const DateProvider = ({
	children
}: React.PropsWithChildren<unknown>) => {
	const initialDate = formatDateSwitcher(new Date());
	const [current, setCurrent] = useState<DateContextType['current']>(
		initialDate.current
	);
	const [year, setYear] = useState<DateContextType['year']>(initialDate.year);
	const [month, setMonth] = useState<DateContextType['month']>(
		initialDate.month
	);
	const [label, setLabel] = useState<DateContextType['label']>(
		initialDate.label
	);
	const value = useMemo(
		() => ({ current, setCurrent, month, year, label }),
		[current, month, year, label]
	);

	useEffect(() => {
		const switcher = formatDateSwitcher(current);

		setMonth(switcher.month);
		setYear(switcher.year);
		setLabel(switcher.label);
	}, [current]);

	return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};
