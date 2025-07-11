import { TOrder } from '@/utils/types';
import styles from './feed.module.css';
import { FeedItem } from '../feed-item/feed-item';

export const Feed = ({ orders }: { orders: TOrder[] }) => {
	return (
		<ul className={styles.feed}>
			{orders && orders.map((item) => <FeedItem item={item} />)}
		</ul>
	);
};
