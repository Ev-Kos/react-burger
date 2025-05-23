import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { useEffect, useState } from 'react';
import { getIngredientsApi } from '@/utils/api/get-ingredients';
import { ErrorMessage } from '@components/error-message/error-message';
import { Loader } from '../loader/loader';
import { debounce } from '@/utils/debounce';

export const App = () => {
	const [isError, setIsError] = useState(false);
	const [ingredients, setIngredients] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getIngredients = async () => {
			try {
				const { data } = await getIngredientsApi();
				setIngredients(data);
			} catch (e) {
				console.error(`Ошибка getIngredientsApi: ${e}`);
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};
		debounce(getIngredients, 500)();
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			{isLoading && <Loader />}
			{isError && (
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
						<BurgerIngredients ingredients={ingredients} />
						<BurgerConstructor ingredients={ingredients} />
					</main>
				</>
			)}
		</div>
	);
};

export default App;
