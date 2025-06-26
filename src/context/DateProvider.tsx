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
	const [max, setMax] = useState<IDateContext['max']>(initialDate.max);
	const [min, setMin] = useState<IDateContext['min']>(initialDate.min);
	const [label, setLabel] = useState<IDateContext['label']>(initialDate.label);
	const [selector, setSelector] = useState<IDateContext['selector']>(
		initialDate.selector
	);
	const value = useMemo(
		() => ({ current, setCurrent, min, max, label, selector }),
		[current, label, min, max, selector]
	);

	useEffect(() => {
		const switcher = formatDateSwitcher(current);

		setMin(switcher.min);
		setMax(switcher.max);
		setLabel(switcher.label);
		setSelector(switcher.selector);
	}, [current]);

	return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};
