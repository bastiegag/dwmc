import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
	CssBaseline,
	StyledEngineProvider,
	ThemeProvider
} from '@mui/material';

import firebaseConfig from './firebaseConfig.ts';
import App from './App.tsx';
import theme from 'theme';

const queryClient = new QueryClient();
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme()}>
				<QueryClientProvider client={queryClient}>
					<CssBaseline />
					<App />
					<ReactQueryDevtools />
				</QueryClientProvider>
			</ThemeProvider>
		</StyledEngineProvider>
	</StrictMode>
);
