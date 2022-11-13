import { USER_RESET_PASSWORD_SUCCESS,
         USER_RESET_PASSWORD_REQUEST,
         USER_RESET_PASSWORD_FAILED,
         TResetPasswordActions } 
       from '../actions/resetPasswordActions';

type TInitialState = {
    resetPasswordSuccess: boolean;
    resetPasswordRequest: boolean;
    resetPasswordFailed: boolean;
};

const initialState: TInitialState = {
    resetPasswordSuccess: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
};

export const resetPasswordReducer = (
    state = initialState, 
    action: TResetPasswordActions
    ): TInitialState => {
    switch (action.type) {
        case USER_RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true
            }
        }
        case USER_RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordSuccess: true,
                resetPasswordRequest: false
            }
        }
        case USER_RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: true
            }
        }
        default: {
            return state;
        }
    }
}