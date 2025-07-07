import { useState, useEffect } from 'react';

interface useShowFieldProps {
	value: string;
	field: {
		name: string;
		hidden: string;
	};
	unregister: (name: string) => void;
}

export const useShowField = ({
	value,
	unregister,
	field
}: useShowFieldProps) => {
	const [show, setShow] = useState<boolean>(true);

	useEffect(() => {
		if (value == field.hidden) {
			unregister(field.name);
			setShow(false);
		} else {
			setShow(true);
		}
	}, [value, field, unregister]);

	return { show };
};
