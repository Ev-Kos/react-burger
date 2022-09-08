import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {getIngredients, getOrderNumber} from '../../utils/api';
import {useState, useEffect} from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {IngredientContext} from '../../services/context';

function App() {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    hasError: false,
  });
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isIngredientDetailsOpen, setIsIngredientDetailsOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState({});
  const [orderNumber, setOrderNumber] = useState(null);

  const openOrderDetails = () => {
    setIsOrderDetailsOpen(true);
  };

  const openIngredientDetails = (el: {}) => {
    setSelectedIngredient(el);
    setIsIngredientDetailsOpen(true);
  }

  const closeModal = () => {
    setIsOrderDetailsOpen(false);
    setIsIngredientDetailsOpen(false);
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

  const handleOderNumber = (order: any) => {
    getOrderNumber(order)
      .then((res) => {
        openOrderDetails();
        setOrderNumber(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AppHeader/>
      <IngredientContext.Provider value={{ state }}>
        <main className={appStyles.content}>
          {state.isLoading && "Загрузка..."}
          {state.hasError && "Произошла ошибка"}
          {!state.isLoading && !state.hasError && (
            <>
            <BurgerIngredients openModal={ openIngredientDetails }/>
            <BurgerConstructor openModal={ handleOderNumber }/>
            </>
          )}  
          {isOrderDetailsOpen && 
            <Modal title={ '' } closeModal={ closeModal }>
              <OrderDetails orderNumber={ orderNumber }/> 
            </Modal> }
          {isIngredientDetailsOpen &&
            <Modal title={ 'Детали ингредиента' } closeModal={ closeModal }>
              <IngredientDetails data={ selectedIngredient } /> 
            </Modal> }
        </main>
      </IngredientContext.Provider>
    </>
  );
}
  
export default App;