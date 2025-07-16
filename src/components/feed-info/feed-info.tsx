import styles from './feed-info.module.css';
import { useMemo } from 'react';
import { ORDER_STATUS } from '@/utils/constants';
import { useSelector } from 'react-redux';
import { wsSelectors } from '@/services/selectors/wsSelector';

type TOrderNumbers = {
	atWork: number[];
	done: number[];
};

export const FeedInfo = () => {
	const feed = useSelector(wsSelectors.getOrders);

	const ordersNumbers: TOrderNumbers = useMemo(() => {
		const result: TOrderNumbers = {
			atWork: [],
			done: [],
		};
		if (feed) {
			feed.orders.forEach((item) => {
				if (item.status === ORDER_STATUS.DONE) {
					result.done.push(item.number);
				} else {
					result.atWork.push(item.number);
				}
			});
		}
		return result;
	}, [feed]);

	const numberDoneSize = useMemo(
		() => (ordersNumbers.done.length > 8 ? `${styles.number}` : ''),
		[ordersNumbers]
	);
	const numberAtWorkSize = useMemo(
		() => (ordersNumbers.atWork.length > 8 ? `${styles.number}` : ''),
		[ordersNumbers]
	);

	return (
		<div className={styles.info_wrap}>
			<div className={styles.info_orders_statuses}>
				<div className={styles.info_orders}>
					<p className='text text_type_main-medium'>Готовы:</p>
					<ul
						className={`${styles.info_orders_numbers} ${styles.info_orders_ready}`}>
						{ordersNumbers.done.length !== 0 &&
							ordersNumbers.done.map((item) => (
								<li
									className={`${numberDoneSize} text text_type_digits-default`}
									key={item}>
									{item}
								</li>
							))}
					</ul>
				</div>
				<div className={styles.info_orders}>
					<p className='text text_type_main-medium'>В работе:</p>
					<ul className={styles.info_orders_numbers}>
						{ordersNumbers.atWork.length !== 0 &&
							ordersNumbers.atWork.map((item) => (
								<li
									className={`${numberAtWorkSize} text text_type_digits-default`}
									key={item}>
									{item}
								</li>
							))}
					</ul>
				</div>
			</div>
			<div className={styles.info_total}>
				<p className='text text_type_main-medium'>Выполнено за все время:</p>
				<p className='text text_type_digits-large'>{feed?.total}</p>
			</div>
			<div className={styles.info_total}>
				<p className='text text_type_main-medium'>Выполнено за сегодня:</p>
				<p className='text text_type_digits-large'>{feed?.totalToday}</p>
			</div>
		</div>
	);
};
