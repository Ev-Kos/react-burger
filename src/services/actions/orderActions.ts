import { getOrderNumber } from '../../utils/api';
import { OpenOrderModal } from './modalActions';
import { ClearConstructor } from './selectedIngredientsActions';
import { AppDispatch, AppThunk } from '../types/index';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export interface IGetOrderRequest {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccess {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly order: number;
}

export interface IGetOrderFailed {
    readonly type: typeof GET_ORDER_FAILED;
}

export type TOrderActions =
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed;

export const GetOrderRequest = (): IGetOrderRequest => ({
    type: GET_ORDER_REQUEST,
})

export const GetOrderSuccess = (order: number): IGetOrderSuccess => ({
    type: GET_ORDER_SUCCESS,
    order
})

export const GetOrderFailed = (): IGetOrderFailed => ({
    type: GET_ORDER_FAILED,
})



export const getOrderNumberApi: AppThunk = (orderData: number) => {
    return function(dispatch: AppDispatch) {
        dispatch(GetOrderRequest());
        getOrderNumber(orderData).then(res => {
            if (res) {
                dispatch(GetOrderSuccess(res));
                dispatch(OpenOrderModal());
                dispatch(ClearConstructor());
            } else {
                dispatch(GetOrderFailed());
            }
        })
        .catch(() => dispatch(GetOrderFailed()));
    }
}