import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientList } from '../ingredients-list/ingredients-list';
import { BASE_HEIGHT, INGREDIENT_TYPES } from '@/utils/constants';
import { useState, useRef } from 'react';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { ingredientType } from '@/utils/types';
import { arrayOf } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
	ingredientDetailState,
	setIngredientForShowDetail,
} from '@/services/slices/ingredientsSlice';

export const BurgerIngredients = ({ ingredients }) => {
	const [currentType, setCurrentType] = useState(INGREDIENT_TYPES.BUN);

	const ingredient = useSelector(ingredientDetailState);

	const dispatch = useDispatch();

	const buns = useRef(null);
	const sauces = useRef(null);
	const mains = useRef(null);

	const selectTabs = (value) => {
		setCurrentType(value);
		switch (value) {
			case INGREDIENT_TYPES.BUN: {
				buns.current.scrollIntoView({ behavior: 'smooth' });
				break;
			}
			case INGREDIENT_TYPES.SAUCE: {
				sauces.current.scrollIntoView({ behavior: 'smooth' });
				break;
			}
			case INGREDIENT_TYPES.MAIN: {
				mains.current.scrollIntoView({ behavior: 'smooth' });
				break;
			}
			default: {
				buns.current.scrollIntoView({ behavior: 'smooth' });
			}
		}
	};

	const scrollTab = () => {
		const bunsCoords = Number(buns.current.getBoundingClientRect().top);
		const saucesCoords = Number(sauces.current.getBoundingClientRect().top);
		const mainsCoords = Number(mains.current.getBoundingClientRect().top);
		if (bunsCoords <= BASE_HEIGHT) {
			setCurrentType(INGREDIENT_TYPES.BUN);
		}
		if (saucesCoords <= BASE_HEIGHT) {
			setCurrentType(INGREDIENT_TYPES.SAUCE);
		}
		if (mainsCoords <= BASE_HEIGHT) {
			setCurrentType(INGREDIENT_TYPES.MAIN);
		}
	};

	const closeModal = () => {
		dispatch(setIngredientForShowDetail(null));
	};

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
				className={`${styles.ingredients_list} custom-scroll mt-10`}
				onScroll={scrollTab}>
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
			{ingredient && (
				<Modal title='Детали ингредиента' closeModal={closeModal}>
					<IngredientDetails />
				</Modal>
			)}
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: arrayOf(ingredientType).isRequired,
};
