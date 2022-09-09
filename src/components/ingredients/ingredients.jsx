import ingredientStyles from './ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientContext } from '../../services/context';
import { useContext, forwardRef } from "react";


const Ingredients = forwardRef(({ type, name, clickInfo }, ref) => {
  const data = useContext(IngredientContext);
  const ingredients = data.state.data;
  
  return (
		<li ref={ref}>
      <h2 className='text text_type_main-medium mt-10 mb-6'>{ name }</h2>
      <div className={ ingredientStyles.container }>
        { ingredients.filter(item => item.type === type).map((element) => (
        <div className={ ingredientStyles.item } key={ element._id } onClick={() => clickInfo(element)}>
        <Counter count={ 1 } size="default" />
        <img src={ element.image } className={ ingredientStyles.image } alt={ element.name } />
        <p className={ ingredientStyles.price }>
        	<span className='text text_type_digits-default'>{ element.price }</span> 
					<CurrencyIcon type="primary" />
        </p>
        <p className={`${ingredientStyles.text} text text_type_main-default`}>{ element.name }</p>
        </div>
  			))}               
      </div>
    </li>
	)
})

Ingredients.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  clickInfo: PropTypes.func.isRequired
}

export default Ingredients

