import React from 'react';
import burgerStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from "../ingredients/ingredients";
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/prop-types';
import { IngredientContext } from '../../services/context';
import { useContext, useRef } from "react";



function BurgerIngredients({openModal}) {
  const data = useContext(IngredientContext);
  const ingredients = data.state.data;
  const [current, setCurrent] = React.useState('bun');

  const bun = useRef();
  const sauce = useRef();
  const main = useRef();

  const selectTabs = (value) => {
    setCurrent(value);
    switch (value) {
      case 'bun': {
        bun.current.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'sauce': {
        sauce.current.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'main': {
        main.current.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      default: {
        bun.current.scrollIntoView({ behavior: 'smooth' });
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
        <Ingredients type='bun' name='Булки' clickInfo={ openModal } ref={bun}/>
        <Ingredients type='sauce' name='Соусы'  clickInfo={ openModal } ref={sauce}/>
        <Ingredients type='main' name='Начинки' clickInfo={ openModal } ref={main}/>
      </ul>
    </section>
  )
}

BurgerIngredients.propTypes = {
  //data: PropTypes.arrayOf(ingredientType).isRequired,
	openModal: PropTypes.func.isRequired
}

export default BurgerIngredients
