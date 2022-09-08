import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {getIngredients} from '../../utils/api';
import {useState, useEffect} from 'react';
import {IngredientContext} from '../../services/context';

function App() {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    hasError: false,
  });
  
  useEffect(() => {
    const getNewData = () => {
      setState({ ...state, hasError: false, isLoading: true });
      getIngredients()
        .then((data) =>
          setState({ ...state, data: data.data, isLoading: false })
        )
        .catch((err) => {
          setState({ ...state, hasError: true, isLoading: false });
        });
    }
    getNewData();
  }, []);

  return (
    <>
      <AppHeader/>
      <IngredientContext.Provider value={{ state }}>
        <main className={appStyles.content}>
          {state.isLoading && "Загрузка..."}
          {state.hasError && "Произошла ошибка"}
          {!state.isLoading && !state.hasError && (
            <>
            <BurgerIngredients />
            <BurgerConstructor />
            </>
          )}  
        </main>
      </IngredientContext.Provider>
    </>
  );
}
  
export default App;