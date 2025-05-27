import { INGREDIENT_TYPES } from '@/utils/constants';
import { ConstructorItem } from '../constructor-item/constructor-item';
import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useMemo, useState } from 'react';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import {
	addIngredient,
	deleteIngredient,
	selectedIngredientsState,
} from '@/services/slices/selectedIngredients';
import { useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';

export const BurgerConstructor = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const selectedIngredients = useSelector(selectedIngredientsState);
	const dispatch = useDispatch();

	const bun = [...selectedIngredients].find(
		(item) => item.type === INGREDIENT_TYPES.BUN
	);

	const totalPrice = useMemo(() => {
		return selectedIngredients.length
			? selectedIngredients.reduce(
					(total, current) =>
						current.type !== INGREDIENT_TYPES.BUN
							? total + current.price
							: total + current.price * 2,
					0
				)
			: 0;
	}, [selectedIngredients]);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const createOrder = () => {
		setIsModalOpen(true);
	};

	const onDropHandler = (ingredient) => {
		if (bun && ingredient.type === INGREDIENT_TYPES.BUN) {
			dispatch(deleteIngredient(bun.key));
		}
		dispatch(addIngredient({ ...ingredient, key: nanoid() }));
	};

	const [{ isHover }, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(ingredient) {
			onDropHandler(ingredient);
		},
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
	});

	const onDelete = useCallback(
		(key) => {
			dispatch(deleteIngredient(key));
		},
		[dispatch]
	);

	const selectedElements = useMemo(
		() =>
			selectedIngredients
				.filter((item) => item.type !== INGREDIENT_TYPES.BUN)
				.map((elem) => (
					<ConstructorItem
						item={elem}
						key={elem.key}
						onDelete={() => onDelete(elem.key)}
					/>
				)),
		[selectedIngredients, onDelete]
	);

	return (
		<section className={styles.burger_constructor}>
			<ul
				className={
					selectedIngredients.length === 0
						? styles.selected_elements_empty
						: isHover
							? styles.selected_elements_hover
							: styles.selected_elements
				}
				ref={dropTarget}>
				{selectedIngredients.length === 0 && !isHover && (
					<p className={styles.empty_ingredients_text}>
						Перенесите сюда выбранные ингредиенты
					</p>
				)}
				{bun && (
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
				)}
				<li className={styles.selected_element_scroll}>
					<ul className={`${styles.selected_elements_scroll} custom-scroll`}>
						{selectedElements}
					</ul>
				</li>
				{bun && (
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
				)}
			</ul>
			<div className={`${styles.order_container} mt-10 mr-4`}>
				{selectedIngredients.length !== 0 && (
					<div className={styles.price_container}>
						<span className='text text_type_digits-medium'>{totalPrice}</span>
						<CurrencyIcon type='primary' />
					</div>
				)}
				<Button
					htmlType='submit'
					type='primary'
					size='large'
					onClick={createOrder}
					disabled={!selectedIngredients.length || !bun}>
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
