import profileFormStyles from './profile-form.module.css';
import {
    EmailInput,
    PasswordInput,
    Input,
    Button,
  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../services/actions/userActions';
import { useState, useRef, useEffect } from 'react';

export default function ProfileForm() {
    const dispatch = useDispatch();
    const userProfile = useSelector((store) => store.userReducer.userAuthProfile);
    const name = userProfile.name;
    const email = userProfile.email;
    const password = userProfile.password;

    const [valueName, setValueName] = useState('');
    const nameRef = useRef(null);
    const onIconClick = () => {
        setTimeout(() => nameRef.current.focus(), 0);
    };

    const onChangeName = (e) => {
        setValueName(e.target.value);
    };

    const [valueEmail, setValueEmail] = useState('');
    const onChangeEmail = (e) => {
        setValueEmail(e.target.value);
    };

    const [valuePassword, setValuePassword] = useState('');
    const onChangePassword = (e) => {
        setValuePassword(e.target.value);
    };

    useEffect(() => {
        setValueName(name);
        setValueEmail(email);
        setValuePassword(password);
    }, [userProfile]);

    function saveProfile(e) {
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
            <Button>Сохранить</Button>
            <Button onClick={resetProfile}>Отмена</Button>
          </div>) : null}
        </div>
      </form>
    );
  }