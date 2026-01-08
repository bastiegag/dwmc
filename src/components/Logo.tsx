import { Box } from '@mui/material';

interface LogoProps {
	size: number;
	color?: string;
}

export const Logo = ({ size, color = 'white' }: LogoProps) => {
	return (
		<Box sx={{ width: size, height: size, margin: '0 auto' }}>
			<svg className="logo" viewBox="0 0 150 150">
				<g fill={color}>
					<path d="M35.3,16.3l-16.1,16.1c-7.7,7.7-7.7,20.2,0,27.9,7.7,7.7,20.2,7.7,27.9,0l16.1-16.1c7.7-7.7,20.2-7.7,27.9,0,7.7,7.7,7.7,20.2,0,27.9l-16.1,16.1c-7.7,7.7-7.7,20.2,0,27.9,7.7,7.7,20.2,7.7,27.9,0l16.1-16.1c23.1-23.1,23.1-60.7,0-83.8-23.1-23.1-62.9-21-86,2.2,0,0,2.2-2.2,2.2-2.2Z" />
					<circle cx="116.9" cy="130.2" r="19.8" />
				</g>
			</svg>
		</Box>
	);
};
