import { USER_REGISTER_SUCCESS,
         USER_REGISTER_REQUEST,
         USER_REGISTER_FAILED } 
       from '../actions/registerActions';

const initialState = {
    registrationSuccess: false,
    registrationRequest: false,
    registrationFailed: false,
}

export const registerReduser = (state = initialState, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST: {
            return {
                ...state,
                registrationRequest: true
            }
        }
        case USER_REGISTER_SUCCESS: {
            return {
                ...state,
                registrationRequest: false,
                registrationSuccess: true,
            }
        }
        case USER_REGISTER_FAILED: {
            return {
                ...state,
                registrationRequest: false,
                registrationFailed: true
            }
        }
        default: {
            return state;
        }
    }
}