import constructorStyles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { INGREDIENT_TYPES } from '../../utils/constants';
import { CLOSE_ORDER_MODAL, 
         OPEN_ORDER_MODAL } 
         from '../../services/actions/modalActions';
import { DELETE_INGREDIENT,
         ADD_INGREDIENT,
         MOVE_ELEMENT } 
         from '../../services/actions/selectedIngredientsActions';
import { getOrderNumberApi } from '../../services/actions/orderActions';
import update from 'immutability-helper';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';

function BurgerConstructor() {
  const selectedIngredient = useSelector((store) => store.selectedIngredientsReducer.selectedIngredient);
  const dispatch = useDispatch();
  const bun = selectedIngredient && selectedIngredient.find((item) => item.type === INGREDIENT_TYPES.BUN);

  const totalPrice = useMemo(() => {
    return (
      selectedIngredient.length ? selectedIngredient.reduce((total, current) => 
    (current.type !== INGREDIENT_TYPES.BUN ? total + current.price : total + current.price * 2), 0) : 0
    )
  }, [selectedIngredient]);

  const isOrderDetailsOpen = useSelector((store) => store.modalReducer.isOrderDetailsOpen);
  const orderNumber = useSelector((store) => store.orderReducer.order);

  const selectedIngredients = useMemo(() => {
    return (
      [...selectedIngredient].filter((item) => item.type !== INGREDIENT_TYPES.BUN)
    )
  }, [selectedIngredient]);

  const userLogin = useSelector((store) => store.userReducer.userLoginSuccess);
  const history = useHistory();

  const handleOrder = () => {
    if(!userLogin) {
      return history.replace('/login');
    } 
    else {
      const order = [bun._id, 
        ...selectedIngredients.map((item) => item._id), 
        bun._id];
        dispatch(getOrderNumberApi(order));
    } 
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  };

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      handleDrop(item);
    }
  });

  const handleDrop = (item) => {
    if (item.type === INGREDIENT_TYPES.BUN) {
      const index = selectedIngredient.findIndex((element) => element === bun);
      if (index !== -1) {
        dispatch({ type: DELETE_INGREDIENT, index });
      }
    }
    dispatch({ type: ADD_INGREDIENT, item: {...item, key:uuidv4()} });
  };

  const deleteIngredient = (item) => {
    const index = selectedIngredient.indexOf(item);
    dispatch({ type: DELETE_INGREDIENT, index });
  };

  const movedIngredient = useCallback((dragIndex, hoverIndex) => {
    const bun = [...selectedIngredient].find((item) => item.type === INGREDIENT_TYPES.BUN);
    const dragElement = selectedIngredients[dragIndex];
    const payload = bun
      ? [bun, ...update(selectedIngredients, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragElement]
        ],
      })]
      : update(selectedIngredients, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragElement]
        ],
      });
    dispatch({ type: MOVE_ELEMENT, payload });
  }, [selectedIngredients]);

  const selectedElements = useMemo(() => selectedIngredient
    .filter((item) => item.type !== INGREDIENT_TYPES.BUN)
    .map((element, index) => (
      <BurgerConstructorElement
        element={ element }
        id={ element._id }
        index={ index }
        onDelete={ deleteIngredient }
        onMove={ movedIngredient } 
        key= { element.key }
      />
    )),
    [selectedIngredient]
  );

  const orderRequest = useSelector((store) => store.orderReducer.orderRequest);

  return (
    <section className={`${constructorStyles.constructor} mr-5 pl-4`} ref={ dropTarget }>
      <ul className={`${constructorStyles.elements} mt-25`}>
        {orderRequest && (
          <div className={constructorStyles.loader}>
            <p className='text text_type_main-large'>
              Обрабатываем Ваш заказ
            </p>
          </div>
        )}
        {bun && (<li className={`${constructorStyles.element} mr-8 mb-4`}>
           <ConstructorElement
            type="top"
            isLocked={true}
            text={`${ bun.name } (верх)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </li>)}
        <li>
          <ul className={`${constructorStyles.elementScroll} mr-4`}>
            { selectedElements }
          </ul>
        </li>
        {bun && (<li className={`${constructorStyles.element} mr-8 mt-4`}>
            <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name } (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </li>)}
      </ul>
      <div className={`${constructorStyles.order} mr-15 mt-10`}>
        <div className={constructorStyles.priceContainer}>
          <span className={constructorStyles.price}>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        {isOrderDetailsOpen && 
            <Modal title={ '' } closeModal={ closeModal }>
              <OrderDetails orderNumber={ orderNumber.number }/> 
            </Modal>}
        <Button type="primary" size="large" onClick={handleOrder} disabled={ !selectedIngredient.length || !bun}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor