import { createRoot } from 'react-dom/client';
import { App } from '@/components/app/app.jsx';
import './index.css';
import { StrictMode } from 'react';
import { store } from './services/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</StrictMode>
);
