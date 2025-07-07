import { FC } from 'react';
import * as Icons from '@tabler/icons-react';
import { IconExclamationCircle } from '@tabler/icons-react';
import { Box, styled, alpha } from '@mui/material';

type TablerIconsType = keyof typeof Icons;

interface IconProps {
	color?: string;
	error?: boolean;
	icon?: string;
	size?: number;
}

export const Icon: FC<IconProps> = ({ icon, color, size = 40, error }) => {
	const TablerIcon = icon ? (Icons[icon as TablerIconsType] as FC) : null;

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
			{error ? <IconExclamationCircle /> : TablerIcon && <TablerIcon />}
		</IconWrapper>
	);
};

const IconWrapper = styled(Box, {
	name: 'Icon'
})({
	alignItems: 'center',
	borderRadius: '100%',
	display: 'flex',
	justifyContent: 'center'
});
