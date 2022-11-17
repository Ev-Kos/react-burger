import { useSelector } from '../../services/hooks';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css';
import { INGREDIENT_TYPES } from '../../utils/constants';
import { useMemo, FC } from 'react';
import { TIngredient } from '../../services/types/data';
import { Link, useLocation } from 'react-router-dom';

export const Ingredient: FC<{element: TIngredient, onClick: () => void}> = ({ element, onClick }) => {
  const selectedIngredient = useSelector((store) => store.selectedIngredientsReducer.selectedIngredient);
  const counter = useMemo(() => {
    return (
      selectedIngredient.filter((item) => item.type === INGREDIENT_TYPES.BUN 
        && item._id === element._id).length * 2 
        || selectedIngredient.filter((item) => item._id === element._id).length
    ); 
  }, [selectedIngredient]);
  
  const [, ref] = useDrag({
    type: 'ingredient',
    item: element
  });

  const location = useLocation();
  const id = element._id;
  
  return (
    <Link key={ id } to={{ pathname: `/ingredients/${id}`, state: { background: location } }}
      className={ ingredientStyles.link }>
      <div className={ ingredientStyles.item } 
        id={ element._id }
        onClick={ onClick }
        ref={ ref }
        draggable>
        {counter !== 0 ? (<Counter count={ counter } size="default" />) : (null)}
        <img src={ element.image } className={ ingredientStyles.image } alt={ element.name } />
        <p className={ ingredientStyles.price }>
          <span className='text text_type_digits-default'>{ element.price }</span> 
			    <CurrencyIcon type="primary" />
        </p>
        <p className={`${ingredientStyles.text} text text_type_main-default`}>{ element.name }</p>
      </div>
    </Link>
  )
}