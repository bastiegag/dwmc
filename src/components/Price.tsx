import { Typography } from '@mui/material';
import { formatPrice } from 'utils';

interface PriceProps {
	value: number;
	styled?: boolean;
	type?: string;
}

export const Price = ({
	value,
	styled = false,
	type = 'expense'
}: PriceProps) => {
	let price = formatPrice(value);
	let color = 'inherit';

	if (styled) {
		switch (type) {
			case 'income':
				color = 'color.green';
				price = `+${formatPrice(value)}`;
				break;
			case 'transfer':
				color = 'color.dark';
				price = `(${formatPrice(value)})`;
				break;
		}
	}

	return (
		<Typography color={color} sx={{ lineHeight: 1 }}>
			{price}
		</Typography>
	);
};
