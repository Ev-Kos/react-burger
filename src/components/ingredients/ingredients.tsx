import ingredientStyles from './ingredients.module.css';
import { forwardRef } from 'react';
import { useSelector } from '../../services/hooks';
import { Ingredient } from '../ingredient/ingredient';
import { TIngredient } from '../../services/types/data';

type Props = { type: string, name: string, onClick: (element: TIngredient) => void}
type Ref = HTMLLIElement

export const Ingredients = forwardRef<Ref, Props>(({ type, name, onClick }, ref) => {
  const ingredients = useSelector(store => store.ingredientsReducer.ingredients);
  const filteredIngredients = ingredients && ingredients.filter(item => item.type === type);
  
  return (
		<li ref={ref}>
      <h2 className='text text_type_main-medium mt-10 mb-6'>{ name }</h2>
      <div className={ ingredientStyles.container }>
      {filteredIngredients.map((element) => (
          <Ingredient element={ element } 
            onClick={() => onClick(element)}
            key={ element._id } 
          />))}              
      </div>
    </li>
	)
})