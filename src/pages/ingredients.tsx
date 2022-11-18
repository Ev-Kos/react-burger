import {IngredientDetails} from '../components/ingredient-details/ingredient-details';
import { useSelector } from '../services/hooks';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import ingredientsPageStyle from './styles-pages.module.css';

export const IngredientsPage = () => {
  const { ingredients } = useSelector((store) => store.ingredientsReducer);
  const { id } = useParams<{id: string}>();
  const ingredient = useMemo(() => ingredients.find((item) => item._id === id), [ingredients]);
  return (
    <>
    <section className={ingredientsPageStyle.ingredientPage}>
      {ingredient && (<IngredientDetails ingredient={ingredient} />)}
      </section>
    </>
  )  
} 