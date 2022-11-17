import { getIngredients } from '../../utils/api';
import { TIngredient } from '../types/data';
import { AppDispatch, AppThunk } from '../types/index';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export interface IGetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: ReadonlyArray<TIngredient>;
}

export interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions =
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed;

export const GetIngredientsRequest = (): IGetIngredientsRequest => ({
    type: GET_INGREDIENTS_REQUEST
})

export const GetIngredientsFailed = (): IGetIngredientsFailed => ({
    type: GET_INGREDIENTS_FAILED
})

export const GetIngredientsSuccess = (ingredients: ReadonlyArray<TIngredient>): IGetIngredientsSuccess => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients
})


export const getAllIngredients: AppThunk = () =>{
    return function(dispatch: AppDispatch) {
        dispatch(GetIngredientsRequest());
        getIngredients().then(res => {
            if (res && res.success) {
                dispatch(GetIngredientsSuccess(res.data));
            } else {
                dispatch(GetIngredientsFailed());
            }
        })
        .catch(() => dispatch(GetIngredientsFailed()));
    }
}