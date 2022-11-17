import burgerStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {Ingredients} from '../ingredients/ingredients';
import { useState, useRef } from 'react';
import { INGREDIENT_TYPES } from '../../utils/constants';
import { useDispatch } from '../../services/hooks';
import { ADD_INGREDIENT_DATA } from '../../services/actions/ingredientActions';
import { OPEN_INGREDIENT_MODAL } from '../../services/actions/modalActions';
import { TIngredient } from '../../services/types/data';
import { BASE_HEIGHT } from '../../utils/constants';

export default function BurgerIngredients() {
  const [current, setCurrent] = useState<string>(INGREDIENT_TYPES.BUN);
  const dispatch = useDispatch();

  const openIngredientDetails = (item: TIngredient) => {
    dispatch({ type: ADD_INGREDIENT_DATA, item });
    dispatch({ type: OPEN_INGREDIENT_MODAL });
  }

  const buns = useRef<HTMLLIElement>(null);
  const sauces = useRef<HTMLLIElement>(null);
  const mains = useRef<HTMLLIElement>(null);

  const selectTabs = (value: string) => {
    setCurrent(value);
    switch (value) {
      case INGREDIENT_TYPES.BUN: {
        buns.current?.scrollIntoView();
        break;
      }
      case INGREDIENT_TYPES.SAUCE: {
        sauces.current?.scrollIntoView();
        break;
      }
      case INGREDIENT_TYPES.MAIN: {
        mains.current?.scrollIntoView();
        break;
      }
      default: {
        buns.current?.scrollIntoView();
      }
    }
  }

  const scrollTab = () => {
    const bun = Number(buns.current?.getBoundingClientRect().top);
    const sauce = Number(sauces.current?.getBoundingClientRect().top);
    const main = Number(mains.current?.getBoundingClientRect().top);

    if (bun <= BASE_HEIGHT) {
      setCurrent(INGREDIENT_TYPES.BUN)
    }
    if (sauce <= BASE_HEIGHT) {
      setCurrent(INGREDIENT_TYPES.SAUCE)
    }
    if (main <= BASE_HEIGHT) {
      setCurrent(INGREDIENT_TYPES.MAIN)
    }
  }

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
    </section>
  )
}
