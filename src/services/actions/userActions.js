import { logoutApi, getUserLogin, getUser, updateTokin, updateUser } from '../../utils/api';
import { setCookie, deleteCookie } from '../../utils/utils';

export const USER_LOGOUT = 'USER_LOGOUT';

export const USER_AUTHORIZATION_SUCCESS = 'USER_AUTHORIZATION_SUCCESS';
export const USER_AUTHORIZATION_REQUEST = 'USER_AUTHORIZATION_REQUEST';
export const USER_AUTHORIZATION_FAILED = 'USER_AUTHORIZATION_FAILED';

export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

export function loginUser(userEmail, userPassword) {
    return function(dispatch) {
        dispatch({
            type: USER_AUTHORIZATION_REQUEST
        });
        const data = getUserLogin(userEmail, userPassword)
        .then(res => {
            let authToken;
            res.headers.forEach(header => {
                if (header.indexOf('Bearer') === 0) {
                    authToken = header.split('Bearer ')[1];
                }
            });
            if (authToken) {
              setCookie('token', authToken);
            }
            return res.json();
          })
        .then(data => data);
            if (data.success) {
                dispatch({
                    type: USER_AUTHORIZATION_SUCCESS,
                    payload: { userEmail, userPassword, ...data.user }
                })
            }
    }
}


export function logoutUser(token) {
    return function(dispatch) {
        logoutApi(token)
            .then(data => data)
            .catch(e => {
                console.log(e.type);
            })
        dispatch({
            type: USER_LOGOUT
        })
        deleteCookie('token');
    }
}

export function getUserData(user) {
    return function(dispatch) {
        getUser()
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: USER_AUTHORIZATION_SUCCESS,
                        payload: { password: data.password, ...data.user }
                    })
                }
                return data.success;
            })
            .catch(e => {
                if (user.name) {
                    const data = updateTokin()
                    .then(res => {
                        let authToken;
                        res.headers.forEach(header => {
                            if (header.indexOf('Bearer') === 0) {
                                authToken = header.split('Bearer ')[1];
                            }
                        });
                            if (authToken) {
                                setCookie('token', authToken);
                            }
                            return res.json();
                    })
                    .then(data => data)
                    .catch(e => {
                        console.log(e.type);
                    })
                }
                console.log(e.type);
            })
    }
}

export function updateUserProfile(userEmail, userPassword, userName) {
    return function(dispatch) {
        updateUser(userName, userEmail, userPassword)
            .then((res) => {
                if (res && res.success === true) {
                    dispatch({
                        type: UPDATE_USER_PROFILE,
                        payload: {...res.user, password: userPassword },
                    });
                }
            })
            .catch((e) => {
                console.log(e.type);
            });
    }
}

