import ingredientStyles from './ingredients.module.css';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import Ingredient from '../ingredient/ingredient';


const Ingredients = forwardRef(({ type, name, onClick }, ref) => {
  const ingredients = useSelector(store => store.ingredientsReducer.ingredients);
  const filteredIngredients = ingredients && ingredients.filter(item => item.type === type);
  
  return (
		<li ref={ref}>
      <h2 className='text text_type_main-medium mt-10 mb-6'>{ name }</h2>
      <div className={ ingredientStyles.container }>
      { filteredIngredients.map((element) => (
          <Ingredient element={ element } 
          onClick={() => onClick(element)}
                      key={ element._id } 
          />))}              
      </div>
    </li>
	)
})

Ingredients.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Ingredients

