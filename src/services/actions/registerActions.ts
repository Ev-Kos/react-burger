import { getUserRegister } from '../../utils/api';
import { AppDispatch, AppThunk } from '../types/index';
import { TUserRegister } from '../types/data';

export const USER_REGISTER_REQUEST: 'USER_REGISTER_REQUEST' = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS' = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILED: 'USER_REGISTER_FAILED' = 'USER_REGISTER_FAILED';

export interface IUserRegisterRequest {
    readonly type: typeof USER_REGISTER_REQUEST;
}

export interface IUserRegisterSuccess {
    readonly type: typeof USER_REGISTER_SUCCESS;
    readonly data: TUserRegister;
}

export interface IUserRegisterFailed {
    readonly type: typeof USER_REGISTER_FAILED;
}

export type TUserRegisterActions =
  | IUserRegisterRequest
  | IUserRegisterSuccess
  | IUserRegisterFailed;

export const UserRegisterRequest = (): IUserRegisterRequest => ({
    type: USER_REGISTER_REQUEST,
})

export const UserRegisterSuccess = (data: TUserRegister): IUserRegisterSuccess => ({
    type: USER_REGISTER_SUCCESS,
    data
})

export const UserRegisterFailed = (): IUserRegisterFailed => ({
    type: USER_REGISTER_FAILED,
})

export const userRegister: AppThunk = 
    (userName: string, userEmail: string, userPassword: string) => {
    return function(dispatch: AppDispatch) {
        dispatch(UserRegisterRequest())
        getUserRegister(userName, userEmail, userPassword)
            .then((data) => {
                dispatch(UserRegisterSuccess(data))
            })
            .catch((err) => {
                console.log(err)
                dispatch(UserRegisterFailed())
            })
    }
}