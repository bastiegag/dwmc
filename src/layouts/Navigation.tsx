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

const Nav = styled(Box)(() => ({
	position: 'fixed',
	bottom: 0,
	left: 0,
	width: '100%'
}));

export const Navigation = () => {
	return (
		<Nav>
			<BottomNavigation showLabels>
				<BottomNavigationAction
					label="Preview"
					icon={<IconEye stroke={1.5} />}
				/>
				<BottomNavigationAction
					label="Budgets"
					icon={<IconChartPie stroke={1.5} />}
				/>
				<BottomNavigationAction
					label="Wallets"
					icon={<IconCreditCard stroke={1.5} />}
				/>
				<BottomNavigationAction
					label="Settings"
					icon={<IconSettings stroke={1.5} />}
				/>
			</BottomNavigation>
		</Nav>
	);
};
