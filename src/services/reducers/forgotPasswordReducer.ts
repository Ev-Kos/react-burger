import { USER_FORGOT_PASSWORD_SUCCESS,
         USER_FORGOT_PASSWORD_REQUEST,
         USER_FORGOT_PASSWORD_FAILED,
         TForgotPasswordActions } 
         from '../actions/forgotPasswordActions';

type TInitialState = {
    forgotPasswordSuccess: boolean;
    forgotPasswordRequest: boolean;
    forgotPasswordFailed: boolean;
}

const initialState: TInitialState = {
    forgotPasswordSuccess: false,
    forgotPasswordRequest: false,
    forgotPasswordFailed: false
}

export const forgotPasswordReducer = (
    state = initialState, 
    action: TForgotPasswordActions
    ): TInitialState => {
    switch (action.type) {
        case USER_FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true
            }
        }
        case USER_FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordSuccess: true,
                forgotPasswordRequest: false
            }
        }
        case USER_FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordFailed: true
            }
        }
        default: {
            return state;
        }
    }
}