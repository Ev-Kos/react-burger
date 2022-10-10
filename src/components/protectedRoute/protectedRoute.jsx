import { useEffect, useState } from 'react';
import { useAuth } from '../../services/auth';
import { Redirect, Route } from 'react-router-dom';

export function ProtectedRoute({ children, ...rest }) {
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