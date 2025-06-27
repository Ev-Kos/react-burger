import { useSelector } from 'react-redux';
import styles from './home-page.module.css';
import { ingredientsSelectors } from '@/services/selectors/ingredientsSelector';
import { useMinimumLoading } from '@/services/hooks/useMinimumLoading';
import { useEffect, useRef } from 'react';
import { fetchIngredients } from '@/services/slices/ingredientsSlice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Loader } from '@/components/loader/loader';
import { InfoMessage } from '@/components/info-message/info-message';
import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@/components/burger-contructor/burger-constructor';
import { LOADING_DELAY } from '@/utils/constants';
import { useAppDispatch } from '@/services/store';

export const HomePage = () => {
	const dispatch = useAppDispatch();

	const ingredients = useSelector(ingredientsSelectors.getIngredients);
	const { getIngredientsfailed } = useSelector(
		ingredientsSelectors.getStatusFlags
	);
	const [isLocalLoading, executeWithLoading] = useMinimumLoading(LOADING_DELAY);

	const isMounted = useRef(true);

	useEffect(() => {
		isMounted.current = true;

		const loadIngredients = async () => {
			try {
				if (typeof executeWithLoading === 'function') {
					await executeWithLoading(() => dispatch(fetchIngredients()).unwrap());
				}
			} catch (e) {
				if (isMounted.current) {
					console.error(`Ошибка getIngredientsApi: ${e}`);
				}
			}
		};

		if (ingredients.length === 0) {
			loadIngredients();
		}

		return () => {
			isMounted.current = false;
		};
	}, [dispatch, executeWithLoading, ingredients.length]);

	return (
		<>
			{isLocalLoading && <Loader />}
			{getIngredientsfailed && (
				<InfoMessage
					text='Произошла ошибка:('
					actionText='Пожалуйста обновите страницу'
				/>
			)}
			{ingredients.length !== 0 && !isLocalLoading && (
				<>
					<h1
						className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
						Соберите бургер
					</h1>
					<main className={`${styles.main} pl-5 pr-5`}>
						<DndProvider backend={HTML5Backend}>
							<BurgerIngredients />
							<BurgerConstructor />
						</DndProvider>
					</main>
				</>
			)}
		</>
	);
};
