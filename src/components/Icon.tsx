import { IconExclamationCircle } from '@tabler/icons-react';
import { Box, styled, alpha } from '@mui/material';
import { useMemo } from 'react';
import type { Theme } from '@mui/material/styles';
import { DynamicIcon } from 'components';

interface IconProps {
	color?: string;
	error?: boolean;
	icon?: string;
	size?: number;
	round?: boolean;
}

const IconWrapper = styled(Box, {
	name: 'Icon',
	shouldForwardProp: (prop) => prop !== 'round'
})<{ round?: boolean }>(({ round = true }) => ({
	alignItems: 'center',
	borderRadius: round ? '100%' : '12px',
	display: 'flex',
	justifyContent: 'center'
}));

export const Icon = ({
	icon,
	color,
	size = 40,
	round = true,
	error
}: IconProps) => {
	const sx = useMemo(
		() => ({
			...(color
				? { bgcolor: `color.${color}`, color: 'white' }
				: { color: 'inherit' }),
			...(error && {
				bgcolor: (theme: Theme) => alpha(theme.palette.error.main, 0.05),
				color: 'error.main'
			}),
			height: size,
			width: size
		}),
		[color, error, size]
	);

	return (
		<IconWrapper round={round} sx={sx}>
			{error ? (
				<IconExclamationCircle />
			) : icon ? (
				<DynamicIcon iconName={icon} />
			) : null}
		</IconWrapper>
	);
};
