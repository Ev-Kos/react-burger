import { useContext, ReactNode, FC } from 'react';
import { loginUser, getUserData, logoutUser } from './actions/userActions';
import { AuthContext } from './context';
import { useDispatch, useSelector } from './hooks';

interface IProvideAuth {
    children: ReactNode;
  }

export const ProvideAuth: FC<IProvideAuth> = ({ children }) => {
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

    const signIn = (userEmail: string, userPassword: string) => {
        dispatch(loginUser(userEmail, userPassword));
    }
    const signOut = (token: string) => {
        dispatch(logoutUser(token));

    }

    return {
        user,
        getUser,
        signIn,
        signOut
    }
}