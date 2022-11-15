import ingredientDetailsStyles from './ingredient-details.module.css';
import { useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';

export default function IngredientDetailsPage(): JSX.Element {
    const { ingredients } = useSelector((store) => store.ingredientsReducer);
    const { id } = useParams<{id: string}>();
    const ingredient = ingredients.find((ingr) => ingr._id === id);
  
    return (
        <> 
            {ingredient && (
                <div className={`${ingredientDetailsStyles.container} pr-25 pb-15 pl-25`}>
                    <h2 className={`text text_type_main-large ${ingredientDetailsStyles.title}`}>Детали ингредиента</h2>
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
            )}
        </>
    )
}