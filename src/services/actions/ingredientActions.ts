import { TIngredient } from '../types/data';

export const ADD_INGREDIENT_DATA: 'ADD_INGREDIENT_DATA' = 'ADD_INGREDIENT_DATA';
export const DELETE_INGREDIENT_DATA: 'DELETE_INGREDIENT_DATA' = 'DELETE_INGREDIENT_DATA';

export interface IAddIngredientData {
    readonly type: typeof ADD_INGREDIENT_DATA;
    readonly item: {payload: TIngredient}
}
  
  export interface IDeleteIngredientData {
    readonly type: typeof DELETE_INGREDIENT_DATA;
}
    
export const AddIngredientData = (item: { payload: TIngredient }): IAddIngredientData => ({
    type: ADD_INGREDIENT_DATA,
    item,
})

export const DeleteIngredientData = (): IDeleteIngredientData => ({
    type: DELETE_INGREDIENT_DATA,
})

export type TIngredientActions =
    | IAddIngredientData
    | IDeleteIngredientData;