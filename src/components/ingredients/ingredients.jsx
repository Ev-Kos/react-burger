import ingredientStyles from "./ingredients.module.css";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function Ingredients ({data, type, name, onClick}) {
  
  return (
		<li>
      <h2 className='text text_type_main-medium mt-10 mb-6'>{ name }</h2>
      <div className={ ingredientStyles.grid }>
        { data.filter(item => item.type === type).map((element, index) => (
        <div className={ ingredientStyles.item } key={ element._id } onClick={() => onClick(element)}>
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


export default Ingredients

