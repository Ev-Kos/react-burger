import burgerStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from '../ingredients/ingredients';
import { useState, useRef, useEffect } from 'react';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { INGREDIENT_TYPES } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_INGREDIENT_DATA, 
         DELETE_INGREDIENT_DATA } 
         from '../../services/actions/ingredientActions';
import { CLOSE_INGREDIENT_MODAL, 
         OPEN_INGREDIENT_MODAL } 
         from '../../services/actions/modalActions';
import { getAllIngredients } from '../../services/actions/ingredientsActions';

function BurgerIngredients() {
  const [current, setCurrent] = useState(INGREDIENT_TYPES.BUN);
  const dispatch = useDispatch();
  const ingredient = useSelector((store) => store.ingredientReducer.detailsIngredient);
  const isIngredientDetailsOpen = useSelector((store) => store.modalReducer.isIngredientDetailsOpen);

  useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);

  const openIngredientDetails = (item) => {
    dispatch({ type: ADD_INGREDIENT_DATA, item });
    dispatch({ type: OPEN_INGREDIENT_MODAL });
  }

  const closeModal = () => {
    dispatch({ type: DELETE_INGREDIENT_DATA });
    dispatch({ type: CLOSE_INGREDIENT_MODAL });
  };

  const buns = useRef();
  const sauces = useRef();
  const mains = useRef();

  const selectTabs = (value) => {
    setCurrent(value);
    switch (value) {
      case INGREDIENT_TYPES.BUN: {
        buns.current.scrollIntoView();
        break;
      }
      case INGREDIENT_TYPES.SAUCE: {
        sauces.current.scrollIntoView();
        break;
      }
      case INGREDIENT_TYPES.MAIN: {
        mains.current.scrollIntoView();
        break;
      }
      default: {
        buns.current.scrollIntoView();
      }
    }
  };

  const scrollTab = (evt) => {
    const scroll = evt.target.scrollTop;
    scroll <= 260
      ? setCurrent(INGREDIENT_TYPES.BUN)
      : scroll <= 1200
      ? setCurrent(INGREDIENT_TYPES.SAUCE)
      : setCurrent(INGREDIENT_TYPES.MAIN);
  };

  return (
    <section className={`${burgerStyles.burgers} mt-10 ml-5`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <nav className="mt-5">
        <div className={burgerStyles.menu}>
          <Tab value={`${INGREDIENT_TYPES.BUN}`} active={current === INGREDIENT_TYPES.BUN} onClick={selectTabs}>
            Булки
          </Tab>
          <Tab value={`${INGREDIENT_TYPES.SAUCE}`} active={current === INGREDIENT_TYPES.SAUCE} onClick={selectTabs}>
            Соусы
          </Tab>
          <Tab value={`${INGREDIENT_TYPES.MAIN}`} active={current === INGREDIENT_TYPES.MAIN} onClick={selectTabs}>
            Начинки
          </Tab>
        </div>
      </nav>
      <ul className={burgerStyles.burgersScroll} onScroll={scrollTab}>
        <Ingredients type={INGREDIENT_TYPES.BUN} name='Булки' onClick={ openIngredientDetails } ref={buns}/>
        <Ingredients type={INGREDIENT_TYPES.SAUCE} name='Соусы' onClick={ openIngredientDetails } ref={sauces}/>
        <Ingredients type={INGREDIENT_TYPES.MAIN} name='Начинки' onClick={ openIngredientDetails } ref={mains}/>
      </ul>
      {isIngredientDetailsOpen &&
      <Modal title={ 'Детали ингредиента' } closeModal={ closeModal } ingredient={ ingredient }>
        <IngredientDetails /> 
      </Modal> }
    </section>
  )
}

export default BurgerIngredients
