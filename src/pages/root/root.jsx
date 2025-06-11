import { Outlet } from 'react-router';
import styles from './root.module.css';
import AppHeader from '@/components/app-header/app-header';

export const Root = () => {
	return (
		<div className={styles.app}>
			<AppHeader />
			<Outlet />
		</div>
	);
};
