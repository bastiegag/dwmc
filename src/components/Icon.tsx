import { FC } from 'react';
import { Avatar } from '@mui/material';
import * as Icons from '@tabler/icons-react';

type TablerIconsType = keyof typeof Icons;

interface IconProps {
	icon?: string;
	color?: string;
	size?: number;
}

interface Icon {
	id: string;
	icon: string;
	name: string;
	section: string;
	color?: string;
}

export const Icon: FC<IconProps> = ({ icon, color, size = 40 }) => {
	const IconComponent = Icons[icon as TablerIconsType] as FC;

	return (
		<Avatar
			sx={{
				bgcolor: `color.${color}`,
				color: 'white',
				width: size,
				height: size
			}}
		>
			<IconComponent />
		</Avatar>
	);
};
