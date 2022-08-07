import ingredientStyles from "./ingredient.module.css";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerConstructorPropTypes } from '../../utils/prop-types';

const Ingredient = (props) => {
  return (
    <li className={ingredientStyles.element}>
      <img className="ml-4 mr-4" src={props.data.image} alt={props.data.name}/>
      <Counter count={1} size="default"/>
      <div className={`${ingredientStyles.price} mt-2 mb-2`}>
        <span className="text text_type_digits-default pr-2">{props.data.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text text_type_main-default">{props.data.name}</p>
    </li>
  )
}

Ingredient.propTypes = {
  data: burgerConstructorPropTypes.isRequired
}

export default Ingredient

