import type { Components, Theme } from '@mui/material';
import type { PaletteColors } from 'theme';

const components = (colors: PaletteColors): Components<Theme> => ({
	MuiAvatar: {
		styleOverrides: {
			root: {
				color: 'inherit',
				backgroundColor: 'transparent'
			}
		}
	},
	MuiBackdrop: {
		styleOverrides: {
			root: {
				backgroundColor: 'rgba(0, 0, 0, 0.25)'
			}
		}
	},
	MuiButton: {
		defaultProps: {
			disableElevation: true
		},
		styleOverrides: {
			root: {
				borderRadius: '40px',
				textTransform: 'none',
				fontWeight: 600,
				borderWidth: '2px'
			}
		}
	},
	MuiContainer: {
		styleOverrides: {
			root: {
				backgroundColor: colors.white,
				minHeight: '100vh'
			}
		}
	},
	MuiDialog: {
		styleOverrides: {
			root: {
				'&.blurred-backdrop .MuiBackdrop-root': {
					backdropFilter: 'blur(8px)'
				}
			},
			paper: {
				'&.transparent': {
					color: colors.white,
					backgroundColor: 'transparent',
					margin: '0',
					width: '100%',
					maxHeight: '100%'
				}
			}
		}
	},
	MuiDivider: {
		styleOverrides: {
			root: {
				borderColor: colors.grey700
			}
		}
	},
	MuiFormGroup: {
		styleOverrides: {
			root: {
				'label:last-child': {
					marginRight: '0'
				}
			}
		}
	},
	MuiIconButton: {
		styleOverrides: {
			root: {
				color: 'inherit'
			}
		}
	},
	MuiInputAdornment: {
		styleOverrides: {
			root: {
				color: 'inherit'
			}
		}
	},
	MuiInputBase: {
		styleOverrides: {
			input: {
				'&:-webkit-autofill': {
					'-webkit-box-shadow': `0 0 0 1000px ${colors.white} inset !important`
				}
			}
		}
	},
	//MuiResponsiveChart: {
	//	styleOverrides: {
	//		container: {
	//			'.MuiChartsAxis-root .MuiChartsAxis-line, .MuiChartsAxis-root .MuiChartsAxis-tick':
	//				{
	//					display: 'none'
	//				}
	//		}
	//	}
	//},
	MuiList: {
		styleOverrides: {
			root: {
				padding: '0'
			}
		}
	},
	MuiListItem: {
		styleOverrides: {
			root: {
				borderBottom: `1px solid ${colors.grey50}`,
				'&:last-child': {
					borderBottom: 0
				}
			},
			padding: {
				padding: '16px'
			}
		}
	},
	MuiListItemText: {
		styleOverrides: {
			root: {
				'.MuiTypography-root': {
					paddingRight: '8px',
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap'
				}
			}
		}
	},
	MuiListItemButton: {
		styleOverrides: {
			root: {
				padding: '16px'
			}
		}
	},
	MuiListItemIcon: {
		styleOverrides: {
			root: {
				minWidth: '40px',
				justifyContent: 'center',
				color: 'inherit',
				marginRight: 16
			}
		}
	},
	MuiRadio: {
		styleOverrides: {
			root: {
				padding: '8px'
			}
		}
	},
	MuiTabs: {
		styleOverrides: {
			root: {
				color: colors.white
			},
			indicator: {
				backgroundColor: colors.white,
				opacity: 0.25,
				height: '100%',
				borderRadius: '40px'
			}
		}
	}
});

export default components;
