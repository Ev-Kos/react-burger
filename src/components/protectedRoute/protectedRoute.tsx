import { useEffect, useState, FC, ReactNode } from 'react';
import { useAuth } from '../../services/auth';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export const ProtectedRoute: FC<RouteProps & { children: ReactNode}> = ({children, ...rest}) => {
    let { getUser, ...auth } = useAuth();
    const [isUserLoaded, setUserLoaded] = useState(false);
    
    const init = async () => {
        await getUser();
        setUserLoaded(true);
    };
    
    useEffect(() => {
        init();
    }, []);
    
    if (!isUserLoaded) {
        return null;
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user.name ? (
                    children
                ) : (
                <Redirect
                    to={{ pathname: '/login', state: { from: location } }}
                />
                )
            }
        />
    )
}
