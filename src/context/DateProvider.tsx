import React, { useEffect, useMemo, useState } from 'react';

import { IDateContext, DateContext } from 'context';
import { formatDateSwitcher } from 'utils';

export const DateProvider = ({
	children
}: React.PropsWithChildren<unknown>) => {
	const initialDate = formatDateSwitcher(new Date());
	const [current, setCurrent] = useState<IDateContext['current']>(
		initialDate.current
	);
	const [year, setYear] = useState<IDateContext['year']>(initialDate.year);
	const [month, setMonth] = useState<IDateContext['month']>(initialDate.month);
	const [max, setMax] = useState<IDateContext['max']>(initialDate.max);
	const [min, setMin] = useState<IDateContext['min']>(initialDate.min);
	const [label, setLabel] = useState<IDateContext['label']>(initialDate.label);
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
