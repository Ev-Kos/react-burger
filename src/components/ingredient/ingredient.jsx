import ingredientStyles from "./ingredient.module.css";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerConstructorPropTypes } from '../../utils/prop-types';

function Ingredient ({data}) {
  return (
    <li className={ingredientStyles.element} key={data._id}>
      <img className="ml-4 mr-4" src={data.image} alt={data.name}/>
      <Counter count={1} size="default"/>
      <div className={`${ingredientStyles.price} mt-2 mb-2`}>
        <span className="text text_type_digits-default pr-2">{data.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text text_type_main-default">{data.name}</p>
    </li>
  )
}

Ingredient.propTypes = {
  data: burgerConstructorPropTypes.isRequired
}

export default Ingredient

