import constructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/prop-types';
import { IngredientContext } from '../../services/context';
import { useContext, useEffect, useReducer } from "react";

const initialState = {
  bun: {},
  toppings: [],
  totalPrice: 0
};

function BurgerConstructor({openModal}) {
  const data = useContext(IngredientContext);
  const ingredients = data.state.data;
  
  function reducer (state, action) {
    const bun = ingredients && ingredients
      .find((item) => item.type === 'bun');
    const toppings = ingredients && ingredients
      .filter((item) => item.type !== 'bun');
    const totalPrice = state.toppings.length && state.toppings
      .reduce((total, current) => total + current.price, 0) + state.bun.price * 2;
    switch (action.type) {
      case 'collect':
        return { ...state, toppings, bun };
      case 'count':
        return { ...state, totalPrice };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'collect' });
    dispatch({ type: 'count' });
  }, [ingredients]);

  const handleOrder = () => {
    const order = [state.bun, ...state.toppings]
      .map((item) => item._id);
    openModal(order);
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
        <Button type="primary" size="large" onClick={handleOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  //data: PropTypes.arrayOf(ingredientType).isRequired,
  openModal: PropTypes.func.isRequired
}

export default BurgerConstructor