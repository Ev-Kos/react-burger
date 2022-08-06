import ingredientStyles from "./ingredient.module.css";
import diamond from "../../images/diamond.png";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = (props) => {
  return (
    <li key={props.data._id} className={ingredientStyles.element}>
      <img className="ml-4 mr-4" src={props.data.image} alt={props.data.name}/>
      <Counter count={1} size="default"/>
      <div className={`${ingredientStyles.price} mt-2 mb-2`}>
        <span className="text text_type_digits-default pr-2">{props.data.price}</span>
        <img className={ingredientStyles.diamond} src={diamond} alt="Валюта"/>
      </div>
      <p className="text text text_type_main-default">{props.data.name}</p>
    </li>
  )
}

export default Ingredient

