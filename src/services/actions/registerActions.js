import { getUserRegister } from '../../utils/api';

export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_FAILED = 'USER_REGISTER_FAILED';

export function userRegister(userName, userEmail, userPassword) {
    return function(dispatch) {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        getUserRegister(userName, userEmail, userPassword)
            .then((data) => {
                dispatch({
                    type: USER_REGISTER_SUCCESS,
                    data
                })
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: USER_REGISTER_FAILED
                })
            })
    }
}