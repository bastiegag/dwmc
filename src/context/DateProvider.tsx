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
	const [max, setMax] = useState<DateContextType['max']>(initialDate.max);
	const [min, setMin] = useState<DateContextType['min']>(initialDate.min);
	const [label, setLabel] = useState<DateContextType['label']>(
		initialDate.label
	);
	const value = useMemo(
		() => ({ current, setCurrent, month, year, min, max, label }),
		[current, month, year, min, max, label]
	);

	useEffect(() => {
		const switcher = formatDateSwitcher(current);

		setMonth(switcher.month);
		setYear(switcher.year);
		setMin(switcher.min);
		setMax(switcher.max);
		setLabel(switcher.label);
	}, [current]);

	return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};
