import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Form } from '../form/form';
import styles from './profile-form.module.css';
import { useSelector } from 'react-redux';
import {
	fetchUpdateUser,
	updateUserSliceState,
} from '@/services/slices/updateUserSlice';
import { userSelector } from '@/services/selectors/userSelector';
import { FormField, TUserData } from '@/utils/types';
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react';
import { useAppDispatch } from '@/services/store';
import { validateEmail, validateEmptyField } from '@/utils/validate';
import { setUser } from '@/services/slices/userSlice';

export const ProfileForm = () => {
	const { request } = useSelector(updateUserSliceState);

	const user = useSelector(userSelector.user);

	const initData: Partial<TUserData> = user
		? { ...user, password: '' }
		: { name: '', email: '', password: '' };
	const inputNameRef = useRef<HTMLInputElement>(null);
	const inputEmailRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();

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
				<div className={styles.buttons}>
					{isChanged && (
						<Button
							htmlType='button'
							size='medium'
							extraClass={styles.cancel_button}
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
	);
};
