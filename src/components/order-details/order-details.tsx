import { createOrderState } from '@/services/slices/createOrderSlice';
import doneImage from '../../images/done.svg';
import styles from './order-details.module.css';
import { useAppSelector } from '@/services/store';

export const OrderDetails = () => {
	const { orderNumber } = useAppSelector(createOrderState);

	return (
		<div className={`${styles.container} pt-4 pr-25 pb-30 pl-25`}>
			<p className={`${styles.order_number} text text_type_digits-large mb-8`}>
				{orderNumber}
			</p>
			<p className='text text_type_main-medium'>Идентификатор заказа</p>
			<img
				src={doneImage}
				alt='Готово'
				className={`${styles.image} mt-15 mb-15`}
			/>
			<p className='text text_type_main-small mb-2'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-default text_color_inactive'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};
