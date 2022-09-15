import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/prop-types';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css';
import {INGREDIENT_TYPES} from '../../utils/constants';

function Ingredient({ element, onClick }) {
    const selectedIngredient = useSelector((store) => store.ingredientsReducer.selectedIngredient);
    const counter = selectedIngredient.filter((item) => item.type === INGREDIENT_TYPES.BUN 
                    && item._id === element._id).length * 2 
                    || selectedIngredient.filter((item) => item._id === element._id).length;
  
    const [, ref] = useDrag({
      type: 'ingredient',
      item: element
    });
  
    return (
        <div className={ ingredientStyles.item } 
             id={ element._id }
             onClick={ onClick }
             ref={ ref }
             draggable>
            <Counter count={ counter } size="default" />
            <img src={ element.image } className={ ingredientStyles.image } alt={ element.name } />
            <p className={ ingredientStyles.price }>
        	    <span className='text text_type_digits-default'>{ element.price }</span> 
			    <CurrencyIcon type="primary" />
            </p>
            <p className={`${ingredientStyles.text} text text_type_main-default`}>{ element.name }</p>
        </div>
    );
  }
  
  Ingredient.propTypes = {
    element: PropTypes.oneOfType([PropTypes.object, ingredientType]).isRequired,
    onClick: PropTypes.func.isRequired
  };
  
  export default Ingredient;