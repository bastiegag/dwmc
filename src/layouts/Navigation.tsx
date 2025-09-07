import { Link } from 'react-router-dom';
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
	width: '100%',
	paddingBottom: 20,
	backgroundColor: 'white'
}));

export const Navigation = () => {
	return (
		<Nav>
			<BottomNavigation showLabels>
				<BottomNavigationAction
					component={Link}
					to="/"
					label="Preview"
					icon={<IconEye stroke={1.5} />}
				/>
				<BottomNavigationAction
					component={Link}
					to="/budgets"
					label="Budgets"
					icon={<IconChartPie stroke={1.5} />}
				/>
				<BottomNavigationAction
					component={Link}
					to="/wallets"
					label="Wallets"
					icon={<IconCreditCard stroke={1.5} />}
				/>
				<BottomNavigationAction
					component={Link}
					to="/settings"
					label="Settings"
					icon={<IconSettings stroke={1.5} />}
				/>
			</BottomNavigation>
		</Nav>
	);
};
