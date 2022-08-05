import React from 'react';
import burgerStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from "../ingredient/ingredient";


const BurgerIngredients = (props) => {
  const [current, setCurrent] = React.useState('bun');
  const buns = props.data.filter(item => item.type === 'bun');
  const sauces = props.data.filter(item => item.type === 'sauce');
  const mains = props.data.filter(item => item.type === 'main');

  return (
    <section className={burgerStyles.burgers}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <nav className="mt-5">
        <div className={burgerStyles.burgers__menu}>
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
      <ul className={burgerStyles.burgers__categories}>
        <li id="bun">
          <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
          <ul className={`${burgerStyles.burger} ml-4 mb-10`}>
            {buns.map(item => <Ingredient key={item._id} data={item}/>)}
          </ul>
        </li>
        <li id="sauce">
          <h2 className="text text_type_main-medium mt-11 mb-6">Соусы</h2>
          <ul className={`${burgerStyles.burger} ml-4 mb-10`}>
            {sauces.map(item => <Ingredient key={item._id} data={item}/>)}
          </ul>
        </li>
        <li id="main">
          <h2 className="text text_type_main-medium mt-11 mb-6">Начинки</h2>
          <ul className={`${burgerStyles.burger} ml-4 mb-10`}>
            {mains.map(item => <Ingredient key={item._id} data={item}/>)} 
          </ul>
        </li>
      </ul>
    </section>
  )
}

export default BurgerIngredients
