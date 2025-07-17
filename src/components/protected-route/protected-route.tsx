import { userSelector } from '@/services/selectors/userSelector';
import { fetchGetUser } from '@/services/slices/getUserSlice';
import { setUser } from '@/services/slices/userSlice';
import { useAppDispatch } from '@/services/store';
import { ROUTEPATHS } from '@/utils/routes';
import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { Loader } from '../loader/loader';

type TProtectedRoute = {
	component: ReactElement;
	isAuth?: boolean;
	isUnauth?: boolean;
	forResetPassword?: boolean;
};

export const ProtectedRoute = ({
	component,
	isAuth = false,
	isUnauth = false,
	forResetPassword = false,
}: TProtectedRoute) => {
	const user = useSelector(userSelector.user);
	const dispatch = useAppDispatch();
	const location = useLocation();
	const [isUserChecked, setIsUserChecked] = useState(false);

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await dispatch(fetchGetUser()).unwrap();
				dispatch(setUser(res?.user));
			} catch (error) {
				console.error(`Ошибка getUser: ${error}`);
			} finally {
				setIsUserChecked(true);
			}
		};
		if (!user) getUser();
		else setIsUserChecked(true);
	}, [dispatch, user]);

	if (!isUserChecked) return <Loader isBackground />;

	if (forResetPassword) {
		if (user) return <Navigate to={ROUTEPATHS.home} replace />;

		return location.state?.fromForgotPassword ? (
			component
		) : (
			<Navigate to={ROUTEPATHS.forgotPass} replace />
		);
	}

	if (isAuth) {
		return user ? (
			component
		) : (
			<Navigate to={ROUTEPATHS.login} state={{ from: location }} replace />
		);
	}

	if (isUnauth) {
		return user ? (
			<Navigate to={location.state?.from || ROUTEPATHS.home} replace />
		) : (
			component
		);
	}

	return component;
};
