import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientList } from '../ingredients-list/ingredients-list';
import { INGREDIENTS_SCROLL_DELAY, INGREDIENT_TYPES } from '@/utils/constants';
import { useState, useRef, useCallback, useEffect } from 'react';
import { ingredientType } from '@/utils/types';
import { arrayOf } from 'prop-types';

export const BurgerIngredients = ({ ingredients }) => {
	const [currentType, setCurrentType] = useState(INGREDIENT_TYPES.BUN);

	const isScroll = useRef(false);

	//const dispatch = useDispatch();

	const listContainerRef = useRef(null);
	const buns = useRef(null);
	const sauces = useRef(null);
	const mains = useRef(null);

	const selectTabs = (value) => {
		isScroll.current = true;
		setCurrentType(value);
		switch (value) {
			case INGREDIENT_TYPES.BUN:
				buns.current.scrollIntoView({ behavior: 'smooth' });
				break;
			case INGREDIENT_TYPES.SAUCE:
				sauces.current.scrollIntoView({ behavior: 'smooth' });
				break;
			case INGREDIENT_TYPES.MAIN:
				mains.current.scrollIntoView({ behavior: 'smooth' });
				break;
			default:
				buns.current.scrollIntoView({ behavior: 'smooth' });
		}
		setTimeout(() => {
			isScroll.current = false;
		}, INGREDIENTS_SCROLL_DELAY);
	};

	const scrollTab = useCallback(() => {
		if (isScroll.current || !listContainerRef.current) return;

		const containerTop = listContainerRef.current.getBoundingClientRect().top;
		const bunsCoords = buns.current.getBoundingClientRect().top - containerTop;
		const saucesCoords =
			sauces.current.getBoundingClientRect().top - containerTop;
		const mainsCoords =
			mains.current.getBoundingClientRect().top - containerTop;

		const coords = [
			{ type: INGREDIENT_TYPES.BUN, value: Math.abs(bunsCoords) },
			{ type: INGREDIENT_TYPES.SAUCE, value: Math.abs(saucesCoords) },
			{ type: INGREDIENT_TYPES.MAIN, value: Math.abs(mainsCoords) },
		];

		coords.sort((a, b) => a.value - b.value);
		setCurrentType(coords[0].type);
	}, []);

	// const closeModal = useCallback(() => {
	// 	dispatch(setIngredientForShowDetail(null));
	// }, [dispatch]);

	useEffect(() => {
		const container = listContainerRef.current;
		if (!container) return;

		container.addEventListener('scroll', scrollTab);
		return () => container.removeEventListener('scroll', scrollTab);
	}, [scrollTab]);

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab
						value='bun'
						active={currentType === INGREDIENT_TYPES.BUN}
						onClick={selectTabs}>
						Булки
					</Tab>
					<Tab
						value='sauce'
						active={currentType === INGREDIENT_TYPES.SAUCE}
						onClick={selectTabs}>
						Соусы
					</Tab>
					<Tab
						value='main'
						active={currentType === INGREDIENT_TYPES.MAIN}
						onClick={selectTabs}>
						Начинки
					</Tab>
				</ul>
			</nav>
			<ul
				className={`${styles.ingredients_list} custom-scroll`}
				ref={listContainerRef}>
				<IngredientList
					name='Булки'
					ingredients={ingredients}
					type={INGREDIENT_TYPES.BUN}
					ref={buns}
				/>
				<IngredientList
					name='Соусы'
					ingredients={ingredients}
					type={INGREDIENT_TYPES.SAUCE}
					ref={sauces}
				/>
				<IngredientList
					name='Начинки'
					ingredients={ingredients}
					type={INGREDIENT_TYPES.MAIN}
					ref={mains}
				/>
			</ul>
			{/* {ingredient && (
				<Modal title='Детали ингредиента' closeModal={closeModal}>
					<IngredientDetails />
				</Modal>
			)} */}
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: arrayOf(ingredientType).isRequired,
};
