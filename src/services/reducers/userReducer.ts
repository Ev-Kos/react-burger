import { USER_AUTHORIZATION_SUCCESS,
         USER_AUTHORIZATION_FAILED,
         USER_AUTHORIZATION_REQUEST,
         USER_LOGOUT,
         UPDATE_USER_PROFILE,
         TUserActions 
        } from '../actions/userActions';
import { TUserProfile } from '../types/data';

type TInitialState = {
    userLoginRequest: boolean;
    userLoginSuccess: boolean;
    userLoginFailed: boolean;
    userAuth: boolean;
    userAuthProfile: TUserProfile;
    user: TUserProfile
}

export const initialState: TInitialState = {
    userLoginRequest: false,
    userLoginSuccess: false,
    userLoginFailed: false,
    userAuth: false,
    userAuthProfile: { name: '', email: '', password: '' },
    user: { name: '', email: '', password: '' }
}

export const userReducer = (
    state = initialState, 
    action: TUserActions
    ): TInitialState => {
    switch (action.type) {
        case USER_AUTHORIZATION_REQUEST:{
            return {
                ...state,
                userLoginRequest: true,
                userAuth: false
            }
        }
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