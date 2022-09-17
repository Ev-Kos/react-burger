import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/prop-types';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css';
import {INGREDIENT_TYPES} from '../../utils/constants';
import { useMemo } from 'react';

function Ingredient({ element, onClick }) {
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
  
    return (
        <div className={ ingredientStyles.item } 
             id={ element._id }
             onClick={ onClick }
             ref={ ref }
             draggable>
            {counter !== 0 ? (<Counter count={ counter } size="default" />) 
            : (null)}
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
    element: ingredientType.isRequired,
    onClick: PropTypes.func.isRequired
  };
  
  export default Ingredient;