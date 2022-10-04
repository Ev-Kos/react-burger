import { getResetPassword } from '../../utils/api';

export const USER_RESET_PASSWORD_SUCCESS = 'USER_RESET_PASSWORD_SUCCESS';
export const USER_RESET_PASSWORD_REQUEST = 'USER_RESET_PASSWORD_REQUEST';
export const USER_RESET_PASSWORD_FAILED = 'USER_RESET_PASSWORD_FAILED';

export function resetPassword(token, password) {
    return function(dispatch) {
        dispatch({
            type: USER_RESET_PASSWORD_REQUEST
        });
        getResetPassword(token, password)
            .then((data) => {
                dispatch({
                    type: USER_RESET_PASSWORD_SUCCESS,
                    data
                });
            })
            .catch((err) => {
                dispatch({
                    type: USER_RESET_PASSWORD_FAILED
                });
            })
    }
}