import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { useEffect } from 'react';
import { ErrorMessage } from '@components/error-message/error-message';
import { Loader } from '../loader/loader';
import { debounce } from '@/utils/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { ingredientsSelectors } from '@/services/selectors/ingredientsSelector';
import {
	fetchIngredients,
	setIsLoading,
} from '@/services/slices/ingredientsSlice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const App = () => {
	const dispatch = useDispatch();

	const ingredients = useSelector(ingredientsSelectors.getIngredients);
	const { failed, isLoading } = useSelector(
		ingredientsSelectors.getStatusFlags
	);

	useEffect(() => {
		const getIngredients = () => {
			try {
				dispatch(fetchIngredients());
			} catch (e) {
				console.error(`Ошибка getIngredientsApi: ${e}`);
			} finally {
				dispatch(setIsLoading(false));
			}
		};
		debounce(getIngredients, 500)();
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			{isLoading && <Loader />}
			{failed && (
				<ErrorMessage
					text='Произошла ошибка:('
					actionText='Пожалуйста обновите страницу'
				/>
			)}
			{ingredients.length !== 0 && (
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
