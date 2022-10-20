import { USER_RESET_PASSWORD_SUCCESS,
         USER_RESET_PASSWORD_REQUEST,
         USER_RESET_PASSWORD_FAILED } 
       from '../actions/resetPasswordActions';

const initialState = {
    resetPasswordSuccess: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
};

export const resetPasswordReducer = (state = initialState, action) => {
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