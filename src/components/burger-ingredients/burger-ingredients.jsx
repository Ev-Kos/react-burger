import React from 'react';
import burgerStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from "../ingredients/ingredients";
import PropTypes from 'prop-types';
import { types } from '../../utils/prop-types';


function BurgerIngredients({data, openModal}) {
  const [current, setCurrent] = React.useState('bun');
  
  return (
    <section className={`${burgerStyles.burgers} mt-10 ml-5`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <nav className="mt-5">
        <div className={burgerStyles.menu}>
          <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
      </nav>
      <ul className={burgerStyles.burgersScroll}>
        <Ingredients data={ data } type='bun' name='Булки' clickInfo={ openModal } />
        <Ingredients data={ data } type='sauce' name='Соусы'  clickInfo={ openModal } />
        <Ingredients data={ data } type='main' name='Начинки' clickInfo={ openModal } />
      </ul>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(types).isRequired,
	openModal: PropTypes.func.isRequired
}

export default BurgerIngredients
