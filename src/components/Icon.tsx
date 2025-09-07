import { FC } from 'react';
import { IconExclamationCircle } from '@tabler/icons-react';
import { Box, styled, alpha } from '@mui/material';

import { DynamicIcon } from 'components';

interface IconProps {
	color?: string;
	error?: boolean;
	icon?: string;
	size?: number;
	round?: boolean;
}

export const Icon: FC<IconProps> = ({
	icon,
	color,
	size = 40,
	round = true,
	error
}) => {
	const IconWrapper = styled(Box, {
		name: 'Icon'
	})({
		alignItems: 'center',
		borderRadius: round ? '100%' : '12px',
		display: 'flex',
		justifyContent: 'center'
	});

	return (
		<IconWrapper
			sx={{
				...(color
					? { bgcolor: `color.${color}`, color: 'white' }
					: { color: 'inherit' }),
				...(error && {
					bgcolor: (theme) => alpha(theme.palette.error.main, 0.05),
					color: 'error.main'
				}),
				height: size,
				width: size
			}}
		>
			{error ? (
				<IconExclamationCircle />
			) : icon ? (
				<DynamicIcon iconName={icon} />
			) : null}
		</IconWrapper>
	);
};
