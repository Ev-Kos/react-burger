import { Feed } from '@/components/feed/feed';
import styles from '../pages.module.css';
import stylesFeedPage from './feed-page.module.css';
import { TOrder } from '@/utils/types';

export const FeedPage = () => {
	const orders: TOrder[] = [];
	return (
		<main className={`${styles.page} ${stylesFeedPage.feed_page}`}>
			<h1
				className={`${stylesFeedPage.title} text text_type_main-large mt-10 mb-5`}>
				Лента заказов
			</h1>
			<div className={stylesFeedPage.feed}>
				<Feed orders={orders} />
				{/* <div className={stylesFeedPage.feed_info}></div> */}
			</div>
		</main>
	);
};
