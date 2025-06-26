import { PaletteMode } from '@mui/material';
import { grey } from '@mui/material/colors';

import { IColors } from 'theme';

const palette = (colors: IColors) => {
	return {
		mode: 'light' as PaletteMode,
		common: {
			black: colors.black,
			white: colors.white
		},
		primary: {
			main: colors.primary
		},
		secondary: {
			main: colors.secondary
		},
		error: {
			main: colors.error
		},
		warning: {
			main: colors.warning
		},
		info: {
			main: colors.info
		},
		success: {
			main: colors.success
		},
		grey: {
			50: colors.grey50,
			100: colors.grey100,
			200: colors.grey200,
			300: colors.grey300,
			400: colors.grey400,
			500: colors.grey500,
			600: colors.grey600,
			700: colors.grey700,
			800: colors.grey800,
			900: colors.grey900,
			A100: colors.a100,
			A200: colors.a200,
			A400: colors.a400,
			A700: colors.a700
		},
		color: {
			red: colors.red,
			orange: colors.orange,
			yellow: colors.yellow,
			green: colors.green,
			teal: colors.teal,
			cyan: colors.cyan,
			blue: colors.blue,
			indigo: colors.indigo,
			purple: colors.purple,
			pink: colors.pink,
			grey: grey[500]
		},
		text: {
			primary: colors.textPrimary,
			secondary: colors.textSecondary,
			disabled: colors.textDisabled
		},
		divider: colors.divider,
		background: {
			paper: colors.bgPaper,
			default: colors.bgDefault
		}
	};
};

export default palette;
