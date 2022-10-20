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
        getUserLogin(userEmail, userPassword)
        .then((data) => {
            let authToken;
            if (data.accessToken && data.accessToken.indexOf('Bearer') === 0) {
                authToken = data.accessToken.split('Bearer ')[1];
            }
            if (authToken) {
                setCookie('token', authToken, 0);
                localStorage.setItem('refreshToken', `${data.refreshToken}`);
            }
            if (data.success) {
                dispatch({
                    type: USER_AUTHORIZATION_SUCCESS,
                    payload: { userEmail, userPassword, ...data.user }
                })
                localStorage.setItem('password', `${userPassword}`);
            }
        })
        .catch(e => {console.log(e.type)})
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
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('password');
    }
}

export function getUserData(user) {
    return function(dispatch) {
        getUser()
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: USER_AUTHORIZATION_SUCCESS,
                        payload: { password: localStorage.getItem('password'), ...data.user }
                    })
                }
                return data.success;
            })
            .catch(error => {
                if (error === "Ошибка: 403") {
                    updateTokin()
                    .then(data => {
                        errorHandler(data);
                    })
                    .catch(e => {
                        console.log(e)
                    })
                }
            })
    }
}

export function updateUserProfile(email, password, name) {
    return function(dispatch) {
        updateUser(email, password, name)
            .then((res) => {
                if (res && res.success === true) {
                    dispatch({
                        type: UPDATE_USER_PROFILE,
                        payload: {...res.user, password: password },
                    });
                    localStorage.setItem('password', password);
                }
            })
            .catch(error => {
                if (error === "Ошибка: 403") {
                    updateTokin()
                    .then(data => {
                        errorHandler(data);
                        updateUser(email, password, name);
                    })
                    .catch(error => {console.log(error)})
                }
            })
    }
}

export const errorHandler = (data) => {
    let authToken;
    if (data.accessToken && data.accessToken.indexOf('Bearer') === 0) {
        authToken = data.accessToken.split('Bearer ')[1];
    }
    if (authToken) {
        setCookie('token', authToken, 0);
        localStorage.setItem('refreshToken', `${data.refreshToken}`);
        console.log('Token обновлен')
    }
}

