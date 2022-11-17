import profileFormStyles from './profile-form.module.css';
import {
    EmailInput,
    PasswordInput,
    Input,
    Button,
  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/hooks';
import { updateUserProfile } from '../../services/actions/userActions';
import { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';

export default function ProfileForm() {
  const dispatch = useDispatch();
  const userProfile = useSelector((store) => store.userReducer.userAuthProfile);
  const {name, email, password} = userProfile;

  const [valueName, setValueName] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const onIconClick = () => {
      setTimeout(() => nameRef.current?.focus(), 0);
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
      setValueName(e.target.value);
  };

  const [valueEmail, setValueEmail] = useState('');
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
      setValueEmail(e.target.value);
  };

  const [valuePassword, setValuePassword] = useState('');
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
      setValuePassword(e.target.value);
  };

  useEffect(() => {
      setValueName(name);
      setValueEmail(email);
      setValuePassword(password);
  }, [userProfile]);

  function saveProfile(e: FormEvent) {
      e.preventDefault();
      dispatch(updateUserProfile(valueEmail, valuePassword, valueName));
  }

  function resetProfile() {
      setValueName(name);
      setValueEmail(email);
      setValuePassword(password);
  }

  return (
    <form onSubmit={saveProfile}>
      <div className={profileFormStyles.userProfile}>
        <div className={profileFormStyles.input}>
          <Input type={'text'}
            placeholder={'Имя'}
            icon={'EditIcon'}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            value={valueName ? valueName : ''}
            ref={nameRef}
            onIconClick={onIconClick}
            onChange={onChangeName}
           />
        </div>
        <div className={`${profileFormStyles.input} pt-6 pb-6`}>
          <EmailInput name={'email'}
            onChange={onChangeEmail}
            value={valueEmail ? valueEmail : ''}
          />
        </div>
        <div className={`${profileFormStyles.input}`}>
          <PasswordInput name={'password'}
            onChange={onChangePassword}
            value={valuePassword ? valuePassword : ''}
          />
        </div>
        {valueName !== name || valuePassword !== password || valueEmail !== email ? (
          <div className={`${profileFormStyles.buttons} pt-10`}>
          <Button htmlType='submit'>Сохранить</Button>
          <Button htmlType='submit' onClick={resetProfile}>Отмена</Button>
        </div>) : null}
      </div>
    </form>
  )
}