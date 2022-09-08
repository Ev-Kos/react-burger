import burgerStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from "../ingredients/ingredients";
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/prop-types';
import { useState, useRef } from "react";



function BurgerIngredients({openModal}) {
  const [current, setCurrent] = useState('bun');

  const buns = useRef();
  const sauces = useRef();
  const mains = useRef();

  const selectTabs = (value) => {
    setCurrent(value);
    switch (value) {
      case 'bun': {
        buns.current.scrollIntoView();
        break;
      }
      case 'sauce': {
        sauces.current.scrollIntoView();
        break;
      }
      case 'main': {
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
          <Tab value="bun" active={current === 'bun'} onClick={selectTabs}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={selectTabs}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={selectTabs}>
            Начинки
          </Tab>
        </div>
      </nav>
      <ul className={burgerStyles.burgersScroll}>
        <Ingredients type='bun' name='Булки' clickInfo={ openModal } ref={buns}/>
        <Ingredients type='sauce' name='Соусы' clickInfo={ openModal } ref={sauces}/>
        <Ingredients type='main' name='Начинки' clickInfo={ openModal } ref={mains}/>
      </ul>
    </section>
  )
}

BurgerIngredients.propTypes = {
  //data: PropTypes.arrayOf(ingredientType).isRequired,
	openModal: PropTypes.func.isRequired
}

export default BurgerIngredients
