import ingredientStyles from "./ingredients.module.css";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { types } from '../../utils/prop-types';
import PropTypes from 'prop-types';


function Ingredients ({data, type, name, clickInfo}) {
  
  return (
		<li>
      <h2 className='text text_type_main-medium mt-10 mb-6'>{ name }</h2>
      <div className={ ingredientStyles.container }>
        { data.filter(item => item.type === type).map((element) => (
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
}

Ingredients.propTypes = {
  data: PropTypes.arrayOf(types).isRequired,
  clickInfo: PropTypes.func.isRequired
}

export default Ingredients

