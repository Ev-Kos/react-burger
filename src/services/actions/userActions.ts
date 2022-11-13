import { logoutApi, getUserLogin, getUser, updateToken, updateUser } from '../../utils/api';
import { setCookie, deleteCookie, errorHandler } from '../../utils/utils';
import { AppDispatch, AppThunk } from '../types/index';

export const USER_LOGOUT: 'USER_LOGOUT' = 'USER_LOGOUT';

export const USER_AUTHORIZATION_SUCCESS: 'USER_AUTHORIZATION_SUCCESS' = 'USER_AUTHORIZATION_SUCCESS';
export const USER_AUTHORIZATION_REQUEST: 'USER_AUTHORIZATION_REQUEST' = 'USER_AUTHORIZATION_REQUEST';
export const USER_AUTHORIZATION_FAILED: 'USER_AUTHORIZATION_FAILED' = 'USER_AUTHORIZATION_FAILED';

export const UPDATE_USER_PROFILE: 'UPDATE_USER_PROFILE' = 'UPDATE_USER_PROFILE';

export interface IUserAuthorizationRequest {
    readonly type: typeof USER_AUTHORIZATION_REQUEST;
}

export interface IUserAuthorizationSuccess {
    readonly type: typeof USER_AUTHORIZATION_SUCCESS;
    readonly payload: { email: string; password: string; name: string };
}

export interface IUserAuthorizationFailed {
    readonly type: typeof USER_AUTHORIZATION_FAILED;
}

export interface IUserLogout {
    readonly type: typeof USER_LOGOUT;
}

export interface IUpdateUserProfile {
    readonly type: typeof UPDATE_USER_PROFILE;
    readonly payload: { email: string; password: string; name: string };
}

export type TUserActions =
  | IUserAuthorizationRequest
  | IUserAuthorizationSuccess
  | IUserAuthorizationFailed
  | IUserLogout
  | IUpdateUserProfile;

export const UserAuthorizationRequest = (): IUserAuthorizationRequest => ({
    type: USER_AUTHORIZATION_REQUEST
})

export const UserAuthorizationSuccess = (payload: { email: string; password: string; name: string }): IUserAuthorizationSuccess => ({
    type: USER_AUTHORIZATION_SUCCESS,
    payload
})

export const UserAuthorizationFailed = (): IUserAuthorizationFailed => ({
    type: USER_AUTHORIZATION_FAILED
})

export const UserLogout = (): IUserLogout => ({
    type: USER_LOGOUT
})

export const UpdateUserProfile = (payload: { email: string; password: string; name: string }): IUpdateUserProfile => ({
    type: UPDATE_USER_PROFILE,
    payload
})

export const loginUser: AppThunk = (userEmail: string, userPassword: string) => {
    return function(dispatch: AppDispatch) {
        dispatch(UserAuthorizationRequest());
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
            }
        })
        .catch((err) => {
            dispatch(UserAuthorizationFailed());
          });
    }
}

export const logoutUser: AppThunk = (token: string) => {
    return function(dispatch: AppDispatch) {
        logoutApi(token)
            .then(data => data)
            .catch(e => {
                console.log(e.type);
            })
        dispatch(UserLogout())
        deleteCookie('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('password');
    }
}

export const getUserData: AppThunk = (user) => {
    return function(dispatch: AppDispatch) {
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
                    updateToken()
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

export const updateUserProfile: AppThunk = (email: string, password: string, name: string) => {
    return function(dispatch: AppDispatch) {
        updateUser(email, password, name)
            .then((res) => {
                if (res && res.success === true) {
                    dispatch({
                        type: UPDATE_USER_PROFILE,
                        payload: {...res.user, password: password },
                    });
                }
            })
            .catch(error => {
                if (error === "Ошибка: 403") {
                    updateToken()
                    .then(data => {
                        errorHandler(data);
                        updateUser(email, password, name);
                    })
                    .catch(error => {console.log(error)})
                }
            })
    }
}

