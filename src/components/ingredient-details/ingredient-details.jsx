import ingredientDetailsStyles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

function IngredientDetails() {
  const ingredient = useSelector((store) => store.ingredientsReducer.detailsIngredient);
  return (
    <div className={`${ingredientDetailsStyles.container} pr-25 pb-15 pl-25`}>
      <img className={ingredientDetailsStyles.image} 
           src={ingredient.image} 
           alt={ ingredient.name }
      />
      <p className={`${ingredientDetailsStyles.title} text text_type_main-medium mt-4 mb-8` }>
         {ingredient.name }
      </p>
      <ul className={`${ingredientDetailsStyles.list} text text_type_main-default text_color_inactive`}>
        <li className={`${ingredientDetailsStyles.element} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Калории, ккал
          </p>
          <p className={`${ingredientDetailsStyles.title} text text_type_main-default text_color_inactive` }>
            {ingredient.calories }
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.element} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Белки, г
          </p>
          <p className={`${ingredientDetailsStyles.title} text text_type_main-default text_color_inactive`}>
            {ingredient.proteins }
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.element} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Жиры, г
          </p>
          <p className={`${ingredientDetailsStyles.title} text text_type_main-default text_color_inactive`}>
            {ingredient.fat}
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.element} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Углеводы, г
          </p>
          <p className={`${ingredientDetailsStyles.title} text text_type_main-default text_color_inactive`}>
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;