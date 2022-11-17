import { getResetPassword} from '../../utils/api';
import { AppThunk } from '../types/index';
import { TUserResetPassword } from '../types/data';

export const USER_RESET_PASSWORD_SUCCESS: 'USER_RESET_PASSWORD_SUCCESS' = 'USER_RESET_PASSWORD_SUCCESS';
export const USER_RESET_PASSWORD_REQUEST: 'USER_RESET_PASSWORD_REQUEST' = 'USER_RESET_PASSWORD_REQUEST';
export const USER_RESET_PASSWORD_FAILED: 'USER_RESET_PASSWORD_FAILED' = 'USER_RESET_PASSWORD_FAILED';

export interface IUserResetPasswordRequest {
    readonly type: typeof USER_RESET_PASSWORD_REQUEST;
}

export interface IUserResetPasswordSuccess {
    readonly type: typeof USER_RESET_PASSWORD_SUCCESS;
    readonly data: TUserResetPassword;
}

export interface IUserResetPasswordFailed {
    readonly type: typeof USER_RESET_PASSWORD_FAILED;
}

export type TResetPasswordActions =
  | IUserResetPasswordSuccess
  | IUserResetPasswordRequest
  | IUserResetPasswordFailed;

export const UserResetPasswordRequest = (): IUserResetPasswordRequest => ({
    type: USER_RESET_PASSWORD_REQUEST,
})

export const UserResetPasswordSuccess = (data: TUserResetPassword): IUserResetPasswordSuccess => ({
    type: USER_RESET_PASSWORD_SUCCESS,
    data
})

export const UserResetPasswordFailed = (): IUserResetPasswordFailed => ({
    type: USER_RESET_PASSWORD_FAILED,
})

export const resetPassword: AppThunk = (resetToken: string, resetPass: string) => {
    return function (dispatch) {
        dispatch(UserResetPasswordRequest());
        getResetPassword(resetToken, resetPass)
            .then((data) => {
                dispatch(UserResetPasswordSuccess(data));
            })
            .catch((err) => {
                dispatch(UserResetPasswordFailed());
            })
      };
}