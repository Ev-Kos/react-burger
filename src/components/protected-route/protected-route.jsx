import { userSelector } from '@/services/selectors/userSelector';
import { fetchGetUser } from '@/services/slices/getUserSlice';
import { setUser } from '@/services/slices/userSlice';
import { ROUTEPATHS } from '@/utils/routes';
import { bool, element } from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

export const ProtectedRoute = ({
	component,
	isAuth = false,
	isUnauth = false,
	forResetPassword = false,
}) => {
	const user = useSelector(userSelector.user);
	const dispatch = useDispatch();
	const location = useLocation();
	const [isUserChecked, setIsUserChecked] = useState(false);

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await dispatch(fetchGetUser()).unwrap();
				dispatch(setUser(res.user));
			} catch (error) {
				console.error(`Ошибка getUser: ${error}`);
			} finally {
				setIsUserChecked(true);
			}
		};
		if (!user) getUser();
		else setIsUserChecked(true);
	}, [dispatch, user]);

	if (!isUserChecked) return null; //loader

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

ProtectedRoute.propTypes = {
	component: element.isRequired,
	isAuth: bool,
	forResetPassword: bool,
};
