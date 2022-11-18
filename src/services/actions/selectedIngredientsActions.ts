import { TSelectedIngredient, TMoveIngredient } from '../types/data';

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const MOVE_ELEMENT: 'MOVE_ELEMENT' = 'MOVE_ELEMENT';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly item: TSelectedIngredient;
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly index: number;
}

export interface IMoveElement {
  readonly type: typeof MOVE_ELEMENT;
  readonly item: TMoveIngredient;
}

export interface IClearConstructor {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TSelectedIngredientsActions =
  | IAddIngredient
  | IDeleteIngredient
  | IMoveElement
  | IClearConstructor;


export const AddIngredient = (item: TSelectedIngredient): IAddIngredient => ({
  type: ADD_INGREDIENT,
  item
})

export const DeleteIngredient = (index: number): IDeleteIngredient => ({
  type: DELETE_INGREDIENT,
  index
})

export const MoveElement = (item: TMoveIngredient): IMoveElement => ({
  type: MOVE_ELEMENT,
  item
})

export const ClearConstructor = (): IClearConstructor => ({
    type: CLEAR_CONSTRUCTOR
})