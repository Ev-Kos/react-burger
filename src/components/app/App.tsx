import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {request} from '../../utils/api';
import { useState, useEffect } from 'react';

function App() {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    hasError: false,
  });

  useEffect(() => {
    const getNewData = () => {
      setState({ ...state, hasError: false, isLoading: true });
      request()
        .then((obj) =>
          setState({ ...state, data: obj.data, isLoading: false })
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
      <main className={appStyles.content}>
        {state.isLoading && "Загрузка..."}
        {state.hasError && "Произошла ошибка"}
        {!state.isLoading && !state.hasError && (
          <>
          <BurgerIngredients data={state.data} />
          <BurgerConstructor data={state.data} />
          </>
        )}  
      </main>
    </>
  );
}
  
export default App;