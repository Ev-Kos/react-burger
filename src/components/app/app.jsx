import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { useEffect, useRef } from 'react';
import { InfoMessage } from '@/components/info-message/info-message';
import { Loader } from '../loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import { ingredientsSelectors } from '@/services/selectors/ingredientsSelector';
import { fetchIngredients } from '@/services/slices/ingredientsSlice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useMinimumLoading } from '@/services/hooks/useMinimumLoading';

export const App = () => {
	const dispatch = useDispatch();

	const ingredients = useSelector(ingredientsSelectors.getIngredients);
	const { getIngredientsfailed } = useSelector(
		ingredientsSelectors.getStatusFlags
	);
	const [isLocalLoading, executeWithLoading] = useMinimumLoading(1000);

	const isMounted = useRef(true);

	useEffect(() => {
		isMounted.current = true;

		const loadIngredients = async () => {
			try {
				await executeWithLoading(() => dispatch(fetchIngredients()).unwrap());
			} catch (e) {
				if (isMounted.current) {
					console.error(`Ошибка getIngredientsApi: ${e}`);
				}
			}
		};

		loadIngredients();

		return () => {
			isMounted.current = false;
		};
	}, [dispatch, executeWithLoading]);

	return (
		<div className={styles.app}>
			<AppHeader />
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
							<BurgerIngredients ingredients={ingredients} />
							<BurgerConstructor />
						</DndProvider>
					</main>
				</>
			)}
		</div>
	);
};

export default App;
