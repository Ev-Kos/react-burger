import { Link } from 'react-router';
import styles from '../pages.module.css';
import stylesNotFound from './not-found-page.module.css';
import { ROUTEPATHS } from '@/utils/routes';

export const NotFoundPage = () => {
	return (
		<section className={`${styles.page} ${styles.page_margin_lg}`}>
			<div className={stylesNotFound.wrap}>
				<h1 className='text text_type_digits-large'>404</h1>
				<p className='text text_type_main-large'>Страница не найдена</p>
				<p className='text text_type_main-medium mt-20'>
					Вернуться на{' '}
					<Link to={ROUTEPATHS.home} className={stylesNotFound.link}>
						главную страницу
					</Link>
				</p>
			</div>
		</section>
	);
};
