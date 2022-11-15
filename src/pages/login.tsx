import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import loginStyle from './styles-pages.module.css';
import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../services/auth';

interface LocationState {
  from: {pathname: string}
}

export default function Login() {
  const location = useLocation<LocationState>();
  const [value, setValue] = useState('');
  const [valuePassword, setValuePassword] = useState('');

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value);
  };

  const auth = useAuth();
  const login = useCallback((e: FormEvent) => {
      e.preventDefault();
      auth.signIn(value, valuePassword);
    },
    [auth, value, valuePassword]
  );

  if (auth.user.name) {
    return <Redirect to={location?.state?.from || '/' } />;
  }

  return (
    <section className={loginStyle.login}>
      <form className={loginStyle.form} onSubmit={login}>
        <h1 className="pb-6 text text_type_main-medium">Вход</h1>
        <div className='pb-6'>
          <Input className={loginStyle.input} 
            type='email'
            name={'email'} 
            value={value} 
            onChange={onChangeEmail}
            placeholder={'E-mail'}/>
        </div>
        <div className='pb-6'>
          <PasswordInput className={loginStyle.input} 
            name={'password'}
            value={valuePassword} 
            onChange={onChangePassword} />
        </div>
        <div className="pb-20 text">
          <Button htmlType='submit'>Войти</Button>
        </div>
        <div className={`pb-4 ${loginStyle.conteiner}`}>
          <p className='text text_type_main-small text_color_inactive'>
            Вы — новый пользователь?
          </p>
          <Link to='/register' className={`text text_type_main-small ${loginStyle.link}`}>
            Зарегистрироваться
          </Link>
        </div>
        <div className={loginStyle.conteiner}>
          <p className='text text_type_main-small text_color_inactive'>
            Забыли пароль?
          </p>
          <Link to='/forgot-password' className={`text text_type_main-small ${loginStyle.link}`}>
            Восстановить пароль
          </Link>
        </div>
      </form>
    </section>
  );
}