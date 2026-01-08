import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
	BottomNavigation,
	BottomNavigationAction,
	Box,
	styled
} from '@mui/material';
import {
	IconEye,
	IconChartPie,
	IconCreditCard,
	IconSettings
} from '@tabler/icons-react';

const NavigationRoot = styled(Box, {
	name: 'Navigation',
	slot: 'root'
})(({ theme }) => ({
	position: 'fixed',
	bottom: 0,
	left: 0,
	width: '100%',
	paddingBottom: 20,
	backgroundColor: theme.palette.background.paper
}));

const ICON_STROKE = 1.5;

const navigationItems = [
	{ to: '/', label: 'Preview', icon: IconEye },
	{ to: '/budgets', label: 'Budgets', icon: IconChartPie },
	{ to: '/wallets', label: 'Wallets', icon: IconCreditCard },
	{ to: '/settings', label: 'Settings', icon: IconSettings }
] as const;

export const Navigation = () => {
	const location = useLocation();
	const currentValue = useMemo(
		() => navigationItems.findIndex((item) => item.to === location.pathname),
		[location.pathname]
	);

	return (
		<NavigationRoot className="Navigation-root">
			<BottomNavigation showLabels value={currentValue}>
				{navigationItems.map(({ to, label, icon: Icon }) => (
					<BottomNavigationAction
						key={to}
						component={Link}
						to={to}
						label={label}
						icon={<Icon stroke={ICON_STROKE} />}
					/>
				))}
			</BottomNavigation>
		</NavigationRoot>
	);
};
