import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyle from './styles-pages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../services/auth';
import { updateUserProfile } from '../services/actions/userActions';
import { useState, useRef, useCallback, useEffect } from 'react';

const navElemActive = `text text_type_main-medium ${profileStyle.navElem}`
const navElem = `text text_type_main-medium text_color_inactive ${profileStyle.navElem}`

function Profile() {
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

  const auth = useAuth();
  const logout = useCallback((e) => {
      e.preventDefault();
      auth.signOut(localStorage.getItem('refreshToken'));
    },
    [auth]
  );

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
    <section className={profileStyle.page}>
      <div className={profileStyle.wrap}>
        <div className={profileStyle.profileConteiner}>
          <nav className='pr-30'>
            <ul className={profileStyle.nav}>
              <li className={navElemActive}>Профиль</li>
              <li className={navElem}>История Заказов</li>
              <li className={navElem} onClick={logout}>Выход</li>
              <li className='pt-20 text text_type_main-small text_color_inactive'>
                В этом разделе вы можете изменить свои персональные данные
              </li>
            </ul>
          </nav>
          <form onSubmit={saveProfile}>
            <div className={profileStyle.userProfile}>
              <div className={profileStyle.input}>
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
              <div className={`${profileStyle.input} pt-6 pb-6`}>
                <EmailInput name={'email'}
                  onChange={onChangeEmail}
                  value={valueEmail ? valueEmail : ''}
                />
              </div>
              <div className={`${profileStyle.input}`}>
                <PasswordInput name={'password'}
                  onChange={onChangePassword}
                  value={valuePassword ? valuePassword : ''}
                />
              </div>
              <div className={`${profileStyle.buttons} pt-10`}>
                <Button>Сохранить</Button>
                <Button onClick={resetProfile}>Отмена</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Profile;