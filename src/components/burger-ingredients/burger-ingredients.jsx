import burgerStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from '../ingredients/ingredients';
import { useState, useRef } from "react";
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {INGREDIENT_TYPES} from '../../utils/constants';



function BurgerIngredients() {
  const [current, setCurrent] = useState(INGREDIENT_TYPES.BUN);
  const [isIngredientDetailsOpen, setIsIngredientDetailsOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState({});

  const openIngredientDetails = (el) => {
    setSelectedIngredient(el);
    setIsIngredientDetailsOpen(true);
  }

  const closeModal = () => {
    setIsIngredientDetailsOpen(false);
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
  
  return (
    <section className={`${burgerStyles.burgers} mt-10 ml-5`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <nav className="mt-5">
        <div className={burgerStyles.menu}>
          <Tab value='bun' active={current === INGREDIENT_TYPES.BUN} onClick={selectTabs}>
            Булки
          </Tab>
          <Tab value='sauce' active={current === INGREDIENT_TYPES.SAUCE} onClick={selectTabs}>
            Соусы
          </Tab>
          <Tab value='main' active={current === INGREDIENT_TYPES.MAIN} onClick={selectTabs}>
            Начинки
          </Tab>
        </div>
      </nav>
      <ul className={burgerStyles.burgersScroll}>
        <Ingredients type='bun' name='Булки' clickInfo={ openIngredientDetails } ref={buns}/>
        <Ingredients type='sauce' name='Соусы' clickInfo={ openIngredientDetails } ref={sauces}/>
        <Ingredients type='main' name='Начинки' clickInfo={ openIngredientDetails } ref={mains}/>
      </ul>
      {isIngredientDetailsOpen &&
      <Modal title={ 'Детали ингредиента' } closeModal={ closeModal }>
        <IngredientDetails data={ selectedIngredient } /> 
      </Modal> }
    </section>
    
  )
}



export default BurgerIngredients
