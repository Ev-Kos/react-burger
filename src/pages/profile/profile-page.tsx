import { NavLink, useNavigate } from 'react-router';
import styles from '../pages.module.css';
import profileStyles from './profile-page.module.css';
import { ROUTEPATHS } from '@/utils/routes';
import { Form } from '@/components/form/form';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { logoutApi } from '@/utils/api/logout';
import { useSelector } from 'react-redux';
import { userSelector } from '@/services/selectors/userSelector';
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react';
import { validateEmail, validateEmptyField } from '@/utils/validate';
import {
	fetchUpdateUser,
	updateUserSliceState,
} from '@/services/slices/updateUserSlice';
import { setUser } from '@/services/slices/userSlice';
import { useAppDispatch } from '@/services/store';
import { FormField, TUserData } from '@/utils/types';

const baseLinkClass = `text text_type_main-medium ${profileStyles.link}`;

export const ProfilePage = () => {
	const user = useSelector(userSelector.user);
	const { request } = useSelector(updateUserSliceState);
	const initData: Partial<TUserData> = user
		? { ...user, password: '' }
		: { name: '', email: '', password: '' };
	const inputNameRef = useRef<HTMLInputElement>(null);
	const inputEmailRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isInputNameDisabled, setIsInputNameDisabled] = useState(true);
	const [isInputEmailDisabled, setIsInputEmailDisabled] = useState(true);

	const [form, setForm] = useState(initData);

	const [errors, setErrors] = useState({
		name: false,
		email: false,
	});
	const [isChanged, setIsChanged] = useState(false);

	useMemo(() => {
		const newErrors = {
			name: Boolean(validateEmptyField(String(form.name))),
			email: Boolean(validateEmail(String(form.email))),
		};
		setErrors(newErrors);

		const hasChanges = Object.keys(initData).some((key) => {
			return form[key as FormField] !== initData[key as FormField];
		});

		setIsChanged(hasChanges);
	}, [form]);

	const handleNameBlur = () => {
		setIsInputNameDisabled(true);
	};

	const handleEmailBlur = () => {
		setIsInputEmailDisabled(true);
	};

	const onIconClickName = () => {
		setTimeout(() => inputNameRef.current?.focus(), 0);
		setIsInputNameDisabled(false);
	};

	const onIconClickEmail = () => {
		setTimeout(() => inputEmailRef.current?.focus(), 0);
		setIsInputEmailDisabled(false);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleCancel = () => {
		setForm(initData);
	};

	const logout = async () => {
		try {
			await logoutApi(String(localStorage.getItem('refreshToken')));
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('accessToken');
			navigate(ROUTEPATHS.login);
			dispatch(setUser(null));
		} catch (e) {
			console.error(`Ошибка: ${e}`);
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const updatedFields: Partial<TUserData> = {};
		Object.keys(form).forEach((key) => {
			if (form[key as FormField] !== initData[key as FormField]) {
				updatedFields[key as FormField] = form[key as FormField];
			}
		});
		try {
			if (Object.keys(updatedFields).length > 0) {
				setIsChanged(false);
				const res = await dispatch(fetchUpdateUser(updatedFields)).unwrap();
				if (res && res.user) {
					dispatch(setUser(res.user));
					setForm({ ...res.user, password: '' });
				}
			}
		} catch (e) {
			setIsChanged(true);
			console.error(`Ошибка fetchUpdateUser: ${e}`);
		}
	};

	const isSaveDisabled =
		!isChanged || Object.values(errors).some((error) => error);

	return (
		<main
			className={`${profileStyles.page_profile} ${styles.page_margin_base}`}>
			<nav className={profileStyles.nav_container}>
				<ul className={profileStyles.nav_list}>
					<li className={profileStyles.link_wrap}>
						<NavLink
							to={ROUTEPATHS.profile}
							className={({ isActive }) =>
								isActive
									? `${baseLinkClass} ${profileStyles.link_active}`
									: baseLinkClass
							}>
							Профиль
						</NavLink>
					</li>
					<li className={profileStyles.link_wrap}>
						<NavLink
							to='/profile/orders'
							className={({ isActive }) =>
								isActive
									? `${baseLinkClass} ${profileStyles.link_active}`
									: baseLinkClass
							}>
							История заказов
						</NavLink>
					</li>
					<button
						className={`${baseLinkClass} ${profileStyles.link_wrap}`}
						onClick={logout}>
						Выход
					</button>
				</ul>
				<p className='text text_type_main-small text_color_inactive'>
					В этом разделе вы можете <br /> изменить свои персональные данные
				</p>
			</nav>
			<Form
				onSubmit={handleSubmit}
				formFields={[
					<Input
						type='text'
						name='name'
						value={String(form.name)}
						placeholder='Имя'
						icon='EditIcon'
						onChange={handleChange}
						error={errors.name}
						errorText='Поле не может быть пустым'
						ref={inputNameRef}
						onIconClick={onIconClickName}
						disabled={isInputNameDisabled}
						onBlur={handleNameBlur}
					/>,
					<Input
						type='email'
						name='email'
						value={String(form.email)}
						placeholder='E-mail'
						icon='EditIcon'
						onChange={handleChange}
						error={errors.email}
						errorText='Введите корректный email'
						ref={inputEmailRef}
						onIconClick={onIconClickEmail}
						disabled={isInputEmailDisabled}
						onBlur={handleEmailBlur}
					/>,
					<PasswordInput
						name='password'
						value={String(form.password)}
						icon='EditIcon'
						onChange={handleChange}
					/>,
					<div className={profileStyles.buttons}>
						{isChanged && (
							<Button
								htmlType='button'
								size='medium'
								extraClass={profileStyles.cancel_button}
								onClick={handleCancel}>
								Отменить
							</Button>
						)}
						<Button
							htmlType='submit'
							type='primary'
							size='medium'
							disabled={isSaveDisabled}>
							{request ? 'Отправка' : 'Сохранить'}
						</Button>
					</div>,
				]}
			/>
		</main>
	);
};
