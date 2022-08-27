import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {getIngredients} from '../../utils/api';
import {useState, useEffect} from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {DataContext, IngredientContext} from '../../services/context';

function App() {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    hasError: false,
  });
  const [isOrderDetails, setIsOrderDetails] = useState(false);
  const [isIngredientDetails, setIsIngredientDetails] = useState(false);
  const [ingredient, setIngredient] = useState({});

  const openOrderDetails = () => {
    setIsOrderDetails(true);
  };

  const openIngredientDetails = (el: {}) => {
    setIngredient(el);
    setIsIngredientDetails(true);
  }

  const closeModal = () => {
    setIsOrderDetails(false);
    setIsIngredientDetails(false);
  };

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
      <main className={appStyles.content}>
        {state.isLoading && "Загрузка..."}
        {state.hasError && "Произошла ошибка"}
        {!state.isLoading && !state.hasError && (
          <>
          <BurgerIngredients data={state.data} openModal={ openIngredientDetails }/>
          <BurgerConstructor data={state.data} openModal={ openOrderDetails }/>
          </>
        )}  
        {isOrderDetails && 
          <Modal title={ '' } closeModal={ closeModal }>
            <OrderDetails /> 
          </Modal> }
        {isIngredientDetails &&
          <Modal title={ 'Детали ингредиента' } closeModal={ closeModal }>
            <IngredientDetails data={ ingredient } /> 
          </Modal> }
      </main>
    </>
  );
}
  
export default App;