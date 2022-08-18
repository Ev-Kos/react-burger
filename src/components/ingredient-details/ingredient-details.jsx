import ingredientDetailsStyles from './ingredient-details.module.css';
import {ingredientType} from '../../utils/prop-types';
import PropTypes from 'prop-types';

function IngredientDetails({data}) {
  return (
    <div className={`${ingredientDetailsStyles.container} pr-25 pb-15 pl-25`}>
      <img className={ingredientDetailsStyles.image} 
           src={data.image} 
           alt={ data.name }
      />
      <p className={`${ingredientDetailsStyles.title} text text_type_main-medium mt-4 mb-8` }>
         {data.name }
      </p>
      <ul className={`${ingredientDetailsStyles.list} text text_type_main-default text_color_inactive`}>
        <li className={`${ingredientDetailsStyles.element} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Калории, ккал
          </p>
          <p className={`${ingredientDetailsStyles.title} text text_type_main-default text_color_inactive` }>
            {data.calories }
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.element} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Белки, г
          </p>
          <p className={`${ingredientDetailsStyles.title} text text_type_main-default text_color_inactive`}>
            {data.proteins }
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.element} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Жиры, г
          </p>
          <p className={`${ingredientDetailsStyles.title} text text_type_main-default text_color_inactive`}>
            {data.fat}
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.element} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Углеводы, г
          </p>
          <p className={`${ingredientDetailsStyles.title} text text_type_main-default text_color_inactive`}>
            {data.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, ingredientType]).isRequired,
};

export default IngredientDetails;