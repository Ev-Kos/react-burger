import { useContext } from 'react';
import { loginUser, getUserData, logoutUser } from './actions/userActions';
import { AuthContext } from './context';
import { useDispatch, useSelector } from 'react-redux';

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useProvideAuth() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.userReducer.userAuthProfile);

    const getUser = () => dispatch(getUserData(user));

    const signIn = (userEmail, userPassword) => {
        dispatch(loginUser(userEmail, userPassword));
    }
    const signOut = (token) => {
        dispatch(logoutUser(token));

    }

    return {
        user,
        getUser,
        signIn,
        signOut
    }
}