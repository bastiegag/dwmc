import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fr';

import Routes from 'routes';
import {
	AlertProvider,
	AuthProvider,
	DateProvider,
	DataProvider
} from 'context';

const App = () => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
			<AlertProvider>
				<AuthProvider>
					<DateProvider>
						<DataProvider>
							<Routes />
						</DataProvider>
					</DateProvider>
				</AuthProvider>
			</AlertProvider>
		</LocalizationProvider>
	);
};

export default App;
