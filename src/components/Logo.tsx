import { Box } from '@mui/material';

interface ILogoProps {
	size: number;
}

export const Logo = ({ size }: ILogoProps) => {
	return (
		<Box sx={{ width: size, height: size }}>
			<svg className="logo" viewBox="0 0 150.64 150.65">
				<g fill="white">
					<path d="M129.02,21.62c-28.83-28.83-75.58-28.83-104.41,0L7.21,39.03c-9.61,9.61-9.61,25.19,0,34.8s25.19,9.61,34.8,0l17.4-17.4c9.61-9.61,25.19-9.61,34.8,0,9.61,9.61,9.61,25.19,0,34.8l-2.96,2.96c9.14-.85,18.58,2.23,25.58,9.23s10.07,16.43,9.23,25.58l2.96-2.96c28.83-28.83,28.83-75.58,0-104.41Z" />
					<circle cx="94.22" cy="126.04" r="24.61" />
				</g>
			</svg>
		</Box>
	);
};
