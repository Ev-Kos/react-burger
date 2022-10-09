import { USER_AUTHORIZATION_SUCCESS,
         USER_AUTHORIZATION_FAILED,
         USER_LOGOUT,
         UPDATE_USER_PROFILE 
        } from '../actions/userActions';

export const initialState = {
    userLoginRequest: false,
    userLoginSuccess: false,
    userLoginFailed: false,
    userAuth: false,
    userAuthProfile: { name: '', email: '', password: '' },
    newUserProfile: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_AUTHORIZATION_SUCCESS: {
            const { email, password, name } = action.payload;
            return {
                ...state,
                userLoginRequest: false,
                userLoginSuccess: true,
                userAuth: true,
                userAuthProfile: {
                    ...state.user,
                    email: email,
                    name: name,
                    password: password
                }
                }
        }
        case USER_AUTHORIZATION_FAILED: {
            return {
                ...state,
                userLoginRequest: false,
                userLoginFailed: true,
                userAuth: false
            }
        }
        case USER_LOGOUT: {
            return {
                ...state,
                userLoginSuccess: false,
                userAuth: false,
                userAuthProfile: {
                    name: '',
                    email: '',
                    password: ''
                }
            };
        }
        case UPDATE_USER_PROFILE: {
            const { email, name, password } = action.payload;
            return {
                ...state,
                userAuthProfile: {
                    ...state.userAuthProfile,
                    email: email,
                    name: name,
                    password: password
                }
            };
        }
        default: {
            return state;
          }
    }
}