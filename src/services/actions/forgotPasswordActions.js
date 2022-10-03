import { getForgotPassword } from '../../utils/api';

export const USER_FORGOT_PASSWORD_SUCCESS = 'USER_FORGOT_PASSWORD_SUCCESS';
export const USER_FORGOT_PASSWORD_REQUEST = 'USER_FORGOT_PASSWORD_REQUEST';
export const USER_FORGOT_PASSWORD_FAILED = 'USER_FORGOT_PASSWORD_FAILED';

export function forgotPassword(userEmail) {
    return function(dispatch) {
        dispatch({
            type: USER_FORGOT_PASSWORD_REQUEST
        });
        getForgotPassword(userEmail)
            .then((data) => {
                dispatch({
                    type: USER_FORGOT_PASSWORD_SUCCESS,
                    data
                });
            })
            .catch((err) => {
                dispatch({
                    type: USER_FORGOT_PASSWORD_FAILED
                });
            })
    }
}