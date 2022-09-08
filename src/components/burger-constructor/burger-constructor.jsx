import constructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientContext } from '../../services/context';
import { useContext, useEffect, useReducer, useState } from "react";
import {getOrderNumber} from '../../utils/api';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {INGREDIENT_TYPES, COLLECT_ACTION, COUNT_ACTION} from '../../utils/constants';

const initialState = {
  bun: {},
  toppings: [],
  totalPrice: 0
};

function BurgerConstructor() {
  const data = useContext(IngredientContext);
  const ingredients = data.state.data;
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);


  const openOrderDetails = () => {
    setIsOrderDetailsOpen(true);
  };
  
  function reducer (state, action) {
    const bun = ingredients && ingredients
      .find((item) => item.type === INGREDIENT_TYPES.BUN);
    const toppings = ingredients && ingredients
      .filter((item) => item.type !== INGREDIENT_TYPES.BUN);
    const totalPrice = state.toppings.length && state.toppings
      .reduce((total, current) => total + current.price, 0) + state.bun.price * 2;
    switch (action.type) {
      case COLLECT_ACTION:
        return { ...state, toppings, bun };
      case COUNT_ACTION:
        return { ...state, totalPrice };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: COLLECT_ACTION });
    dispatch({ type: COUNT_ACTION });
  }, [ingredients]);

  const handleOrder = () => {
    const order = [state.bun, state.bun, ...state.toppings]
      .map((item) => item._id);
      makeOrder(order);
  };

  const makeOrder = (order) => {
    getOrderNumber(order)
      .then((res) => {
        openOrderDetails();
        setOrderNumber(res);
      })
      .catch((err) => console.log(err))
      .catch((err) => alert("Произошла ошибка"));
  };

  const closeModal = () => {
    setIsOrderDetailsOpen(false);
  };

  return (
    <section className={`${constructorStyles.constructor} mr-5 pl-4`}>
      <ul className={`${constructorStyles.elements} mt-25`}>
        <li className={`${constructorStyles.element} mr-8 mb-4`}>
          {state.bun && <ConstructorElement
            type="top"
            isLocked={true}
            text={`${state.bun.name } (верх)`}
            price={state.bun.price}
            thumbnail={state.bun.image_mobile}
          />}
        </li>
        <li>
          <ul className={`${constructorStyles.elementScroll} mr-4`}>
            {state.toppings.map((elem) => {
                return(
                  <li key={elem._id} className={`${constructorStyles.element} mr-2`}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={elem.name}
                      price={elem.price}
                      thumbnail={elem.image_mobile}
                    />
                  </li>)
            })}
          </ul>
        </li>
        <li className={`${constructorStyles.element} mr-8 mt-4`}>
          {state.bun && <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${state.bun.name } (низ)`}
            price={state.bun.price}
            thumbnail={state.bun.image_mobile}
          />}
        </li>
      </ul>
      <div className={`${constructorStyles.order} mr-15 mt-10`}>
        <div className={constructorStyles.priceContainer}>
          <span className={constructorStyles.price}>{state.totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        {isOrderDetailsOpen && 
            <Modal title={ '' } closeModal={ closeModal }>
              <OrderDetails orderNumber={ orderNumber }/> 
            </Modal>}
        <Button type="primary" size="large" onClick={handleOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor