import { getForgotPassword } from '../../utils/api';
import { AppDispatch, AppThunk } from '../types/index';
import { TUserForgotPassword } from '../types/data'

export const USER_FORGOT_PASSWORD_SUCCESS: 'USER_FORGOT_PASSWORD_SUCCESS' = 'USER_FORGOT_PASSWORD_SUCCESS';
export const USER_FORGOT_PASSWORD_REQUEST: 'USER_FORGOT_PASSWORD_REQUEST' = 'USER_FORGOT_PASSWORD_REQUEST';
export const USER_FORGOT_PASSWORD_FAILED: 'USER_FORGOT_PASSWORD_FAILED' = 'USER_FORGOT_PASSWORD_FAILED';

export interface IUserForgotRequest {
    readonly type: typeof USER_FORGOT_PASSWORD_REQUEST;
}

export interface IUserForgotSuccess {
    readonly type: typeof USER_FORGOT_PASSWORD_SUCCESS;
    readonly data: TUserForgotPassword;
}

export interface IUserForgotFailed {
    readonly type: typeof USER_FORGOT_PASSWORD_FAILED;
}

export type TForgotPasswordActions =
  | IUserForgotSuccess
  | IUserForgotRequest
  | IUserForgotFailed;

export const UserForgotRequest = (): IUserForgotRequest => ({
    type: USER_FORGOT_PASSWORD_REQUEST,
})

export const UserForgotSuccess = (data: TUserForgotPassword): IUserForgotSuccess => ({
    type: USER_FORGOT_PASSWORD_SUCCESS,
    data
})

export const UserForgotRFailed = (): IUserForgotFailed => ({
    type: USER_FORGOT_PASSWORD_FAILED,
})

export const forgotPassword: AppThunk = (userEmail: string) => {
    return function(dispatch: AppDispatch) {
        dispatch(UserForgotRequest());
        getForgotPassword(userEmail)
            .then((data) => {
                dispatch(UserForgotSuccess(data));
            })
            .catch((err) => {
                dispatch(UserForgotRFailed());
            })
    }
}