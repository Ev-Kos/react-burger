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
	setIngredients,
} from '@/services/slices/selectedIngredients';
import { useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';
import {
	createOrderState,
	fetchCreateOrder,
} from '@/services/slices/createOrderSlice';
import { Loader } from '../loader/loader';
import update from 'immutability-helper';
import { InfoMessage } from '../info-message/info-message';
import { useMinimumLoading } from '@/services/hooks/useMinimumLoading';

export const BurgerConstructor = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLocalLoading, executeWithLoading] = useMinimumLoading(400);
	const selectedIngredients = useSelector(selectedIngredientsState);
	const { request: orderRequest, failed: orderFailed } =
		useSelector(createOrderState);
	const dispatch = useDispatch();

	const isEmpty = selectedIngredients.length === 0;
	const isLoading = isLocalLoading || orderRequest;

	const bun = useMemo(
		() =>
			selectedIngredients.find((item) => item.type === INGREDIENT_TYPES.BUN),
		[selectedIngredients]
	);

	const fillings = useMemo(
		() =>
			selectedIngredients.filter((item) => item.type !== INGREDIENT_TYPES.BUN),
		[selectedIngredients]
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

	const closeModal = useCallback(() => setIsModalOpen(false), []);

	const handleOrder = useCallback(async () => {
		if (isEmpty || !bun) return;

		executeWithLoading(async () => {
			const ids = selectedIngredients.map((item) => item._id);
			const result = await dispatch(
				fetchCreateOrder({ ingredients: ids })
			).unwrap();

			setIsModalOpen(true);
			dispatch(setIngredients([]));
			return result;
		}).catch((e) => {
			console.error(`Ошибка создания заказа: ${e}`);
		});
	}, [selectedIngredients, bun, isEmpty, executeWithLoading, dispatch]);

	const [{ isHover }, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(ingredient) {
			if (bun && ingredient.type === INGREDIENT_TYPES.BUN) {
				dispatch(deleteIngredient(bun.key));
			}
			dispatch(addIngredient({ ...ingredient, key: nanoid() }));
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

	const movedIngredient = useCallback(
		(dragIndex, hoverIndex) => {
			const dragElement = fillings[dragIndex];
			const newFillings = update(fillings, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragElement],
				],
			});

			const newIngredients = bun ? [bun, ...newFillings] : newFillings;

			dispatch(setIngredients(newIngredients));
		},
		[fillings, bun, dispatch]
	);

	const selectedElements = useMemo(
		() =>
			fillings.map((elem, index) => (
				<ConstructorItem
					item={elem}
					key={elem.key}
					onDelete={() => onDelete(elem.key)}
					onMove={movedIngredient}
					index={index}
				/>
			)),
		[fillings, onDelete, movedIngredient]
	);

	const containerClass = useMemo(() => {
		if (isEmpty) return styles.selected_elements_empty;
		return isHover ? styles.selected_elements_hover : styles.selected_elements;
	}, [isEmpty, isHover]);

	const clearOrder = () => {
		dispatch(setIngredients([]));
	};

	return (
		<section className={styles.burger_constructor}>
			<ul className={containerClass} ref={dropTarget}>
				<li className={`${styles.selected_element} pr-4`}>
					{bun ? (
						<ConstructorElement
							type='top'
							isLocked={true}
							text={`${bun.name} (верх)`}
							price={bun.price}
							thumbnail={bun.image_mobile}
							extraClass={styles.selected_element_hover}
						/>
					) : (
						<>
							{fillings.length !== 0 && (
								<p
									className={`${styles.selected_element_bun} text text_type_main-medium`}>
									{' '}
									Добавте булочку
								</p>
							)}
						</>
					)}
				</li>
				<li className={styles.selected_element_scroll}>
					<ul className={`${styles.selected_elements_scroll} custom-scroll`}>
						{selectedElements}
					</ul>
				</li>
				{isEmpty && !isHover && !orderRequest && !orderFailed && (
					<InfoMessage text='Перенесите сюда выбранные ингредиенты' />
				)}
				{orderFailed && (
					<InfoMessage
						text='Произошла ошибка'
						actionText='Попробуйте повторить создание заказа'
					/>
				)}
				{isLoading && (
					<Loader text='Обрабатываем Ваш заказ' isBackground={true} />
				)}
				<li className={`${styles.selected_element} pr-4`}>
					{bun && (
						<ConstructorElement
							type='bottom'
							isLocked={true}
							text={`${bun.name} (низ)`}
							price={bun.price}
							thumbnail={bun.image_mobile}
							extraClass={styles.selected_element_hover}
						/>
					)}
				</li>
			</ul>
			<div
				className={`${isEmpty ? styles.order_container_empty : styles.order_container} mt-10 mr-4 ml-4`}>
				{!isEmpty && (
					<Button
						htmlType='button'
						size='medium'
						extraClass={styles.clear_button}
						onClick={clearOrder}>
						Очистить
					</Button>
				)}
				{!isEmpty && (
					<div className={styles.price_container}>
						<span className='text text_type_digits-medium'>{totalPrice}</span>
						<CurrencyIcon type='primary' />
					</div>
				)}
				<Button
					htmlType='submit'
					type='primary'
					size='large'
					onClick={handleOrder}
					disabled={isEmpty || !bun || isLoading}>
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
