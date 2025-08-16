import { createTheme } from '@mui/material';

import colors from 'assets/scss/_vars.module.scss';
import palette from './palette';
import components from './components';

export interface PaletteColors {
	[key: string]: string;
}

const appTheme = () => {
	const themeOptions = {
		palette: palette(colors),
		components: components(colors),
		typography: {
			fontFamily: 'Montserrat',
			fontSize: 14
		},
		shape: {
			borderRadius: 16
		}
	};

	return createTheme(themeOptions);
};

export default appTheme;
