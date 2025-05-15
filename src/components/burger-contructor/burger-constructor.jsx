import { INGREDIENT_TYPES } from '@/utils/constants';
import { ConstructorItem } from '../constructor-item/constructor-item';
import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { ingredientType } from '@/utils/types';
import { arrayOf } from 'prop-types';

export const BurgerConstructor = ({ ingredients }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const selectedElements = useMemo(
		() =>
			ingredients
				.filter((item) => item.type !== INGREDIENT_TYPES.BUN)
				.map((elem) => <ConstructorItem item={elem} key={elem._id} />),
		[ingredients]
	);

	const bun = [...ingredients].find(
		(item) => item.type === INGREDIENT_TYPES.BUN
	);

	const totalPrice = useMemo(() => {
		return ingredients.length
			? ingredients.reduce(
					(total, current) =>
						current.type !== INGREDIENT_TYPES.BUN
							? total + current.price
							: total + current.price * 2,
					0
				)
			: 0;
	}, [ingredients]);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const createOrder = () => {
		setIsModalOpen(true);
	};

	return (
		<section className={styles.burger_constructor}>
			<ul className={styles.selected_elements}>
				<li className={`${styles.selected_element} pr-4`}>
					<ConstructorElement
						type='top'
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image_mobile}
						extraClass={styles.selected_element_hover}
					/>
				</li>
				<li>
					<ul className={`${styles.selected_elements_scroll} custom-scroll`}>
						{selectedElements}
					</ul>
				</li>
				<li className={`${styles.selected_element} pr-4`}>
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image_mobile}
						extraClass={styles.selected_element_hover}
					/>
				</li>
			</ul>
			<div className={`${styles.order_container} mt-10 mr-4`}>
				<div className={styles.price_container}>
					<span className='text text_type_digits-medium'>{totalPrice}</span>
					<CurrencyIcon type='primary' />
				</div>
				<Button
					htmlType='submit'
					type='primary'
					size='large'
					onClick={createOrder}>
					Оформить заказ
				</Button>
			</div>
			{isModalOpen && (
				<Modal title='' closeModal={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredients: arrayOf(ingredientType).isRequired,
};
