import { createTheme, type Theme } from '@mui/material';

import colors from 'assets/scss/_vars.module.scss';
import palette from './palette';
import components from './components';

export interface PaletteColors {
	[key: string]: string;
}

const appTheme = (): Theme =>
	createTheme({
		palette: palette(colors),
		components: components(colors),
		typography: {
			fontFamily: 'Montserrat',
			fontSize: 15
		},
		shape: {
			borderRadius: 16
		}
	});

export default appTheme;
