import { getOrderNumber } from '../../utils/api';
import {OPEN_ORDER_MODAL} from './modalActions';
import {CLEAR_CONSTRUCTOR} from './selectedIngredientsActions';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function getOrderNumberApi(orderData) {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        getOrderNumber(orderData).then(res => {
            if (res) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    order: res,
                });
                dispatch({
                     type: OPEN_ORDER_MODAL
                });
                dispatch({
                    type: CLEAR_CONSTRUCTOR
               });
            } else {
                dispatch({
                    type: GET_ORDER_FAILED
                });
            }
        })
        .catch(() => dispatch({ type: GET_ORDER_FAILED }));
    }
}