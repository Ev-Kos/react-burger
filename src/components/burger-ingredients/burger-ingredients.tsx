import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientList } from '../ingredients-list/ingredients-list';
import { INGREDIENTS_SCROLL_DELAY, INGREDIENT_TYPES } from '@/utils/constants';
import { useState, useRef, useCallback, useEffect } from 'react';
import { ingredientsSelectors } from '@/services/selectors/ingredientsSelector';
import { useAppSelector } from '@/services/store';

export const BurgerIngredients = () => {
	const [currentType, setCurrentType] = useState(INGREDIENT_TYPES.BUN);
	const ingredients = useAppSelector(ingredientsSelectors.getIngredients);
	const isScroll = useRef(false);

	const listContainerRef = useRef<HTMLUListElement>(null);
	const buns = useRef<HTMLLIElement>(null);
	const sauces = useRef<HTMLLIElement>(null);
	const mains = useRef<HTMLLIElement>(null);

	const selectTabs = (value: string) => {
		isScroll.current = true;
		setCurrentType(value);
		switch (value) {
			case INGREDIENT_TYPES.BUN:
				buns.current?.scrollIntoView({ behavior: 'smooth' });
				break;
			case INGREDIENT_TYPES.SAUCE:
				sauces.current?.scrollIntoView({ behavior: 'smooth' });
				break;
			case INGREDIENT_TYPES.MAIN:
				mains.current?.scrollIntoView({ behavior: 'smooth' });
				break;
			default:
				buns.current?.scrollIntoView({ behavior: 'smooth' });
		}
		setTimeout(() => {
			isScroll.current = false;
		}, INGREDIENTS_SCROLL_DELAY);
	};

	const scrollTab = useCallback(() => {
		if (isScroll.current || !listContainerRef.current) return;

		const containerTop = listContainerRef.current.getBoundingClientRect().top;
		const bunsCoords =
			Number(buns.current?.getBoundingClientRect().top) - containerTop;
		const saucesCoords =
			Number(sauces.current?.getBoundingClientRect().top) - containerTop;
		const mainsCoords =
			Number(mains.current?.getBoundingClientRect().top) - containerTop;

		const coords = [
			{ type: INGREDIENT_TYPES.BUN, value: Math.abs(bunsCoords) },
			{ type: INGREDIENT_TYPES.SAUCE, value: Math.abs(saucesCoords) },
			{ type: INGREDIENT_TYPES.MAIN, value: Math.abs(mainsCoords) },
		];

		coords.sort((a, b) => a.value - b.value);
		setCurrentType(coords[0].type);
	}, []);

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
		</section>
	);
};
