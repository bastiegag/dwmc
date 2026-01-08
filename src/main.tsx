import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
	CssBaseline,
	StyledEngineProvider,
	ThemeProvider
} from '@mui/material';

import firebaseConfig from './firebaseConfig';
import App from './App';
import theme from 'theme';

const queryClient = new QueryClient();
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

interface WindowWithRoot extends Window {
	_rootInstance?: ReturnType<typeof createRoot>;
}

let root: ReturnType<typeof createRoot>;
if (!(window as WindowWithRoot)._rootInstance) {
	root = createRoot(rootElement);
	(window as WindowWithRoot)._rootInstance = root;
} else {
	root = (window as WindowWithRoot)._rootInstance!;
}

root.render(
	<StrictMode>
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme()}>
				<QueryClientProvider client={queryClient}>
					<CssBaseline />
					<App />
					{/*{import.meta.env.DEV && <ReactQueryDevtools />}*/}
				</QueryClientProvider>
			</ThemeProvider>
		</StyledEngineProvider>
	</StrictMode>
);
