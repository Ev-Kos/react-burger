import styles from './home-page.module.css';
import { ingredientsSelectors } from '@/services/selectors/ingredientsSelector';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Loader } from '@/components/loader/loader';
import { InfoMessage } from '@/components/info-message/info-message';
import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@/components/burger-contructor/burger-constructor';
import { useAppSelector } from '@/services/store';

export const HomePage = ({ isLocalLoading }: { isLocalLoading: boolean }) => {
	const ingredients = useAppSelector(ingredientsSelectors.getIngredients);
	const { getIngredientsfailed } = useAppSelector(
		ingredientsSelectors.getStatusFlags
	);

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
