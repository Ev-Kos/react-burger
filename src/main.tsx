import { createRoot } from 'react-dom/client';
import { App } from '@/components/app/app.jsx';
import './index.css';
import { StrictMode } from 'react';
import { store } from './services/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
