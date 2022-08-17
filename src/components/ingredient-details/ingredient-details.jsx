import ingredientDetailsStyles from './ingredient-details.module.css';

function IngredientDetails({data}) {
  return (
    <div className={ ingredientDetailsStyles.container }>
      <img className={ ingredientDetailsStyles.image } 
           src={data.image} 
           alt={ data.name }
      />
      <p className={`${ ingredientDetailsStyles.title} text text_type_main-medium` }>
         {data.name }
      </p>
      <ul className={`${ ingredientDetailsStyles.grid} text text_type_main-default text_color_inactive`}>
        <li className={ingredientDetailsStyles.element}>
          <p className={ingredientDetailsStyles.characteristic}>
            Калории, ккал
          </p>
          <p className="text text_type_digits-default">{data.calories }</p>
        </li>
        <li className={ingredientDetailsStyles.element}>
          <p className={ingredientDetailsStyles.characteristic}>
            Белки, г
          </p>
          <p className="text text_type_digits-default">
            {data.proteins }
          </p>
        </li>
        <li className={ingredientDetailsStyles.element}>
          <p className={ingredientDetailsStyles.characteristic}>
            Жиры, г
          </p>
          <p className="text text_type_digits-default">{data.fat}</p>
        </li>
        <li className={ingredientDetailsStyles.element}>
          <p className={ingredientDetailsStyles.characteristic}>
            Углеводы, г
          </p>
          <p className="text text_type_digits-default">
            {data.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;