import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import loginStyle from './styles-pages.module.css';
import { useState, useCallback } from 'react';
import { useAuth } from '../services/auth';

function Login() {
  const [value, setValue] = useState('');
  const [valuePassword, setValuePassword] = useState('');

  const onChangeEmail = (e) => {
    setValue(e.target.value);
  };
  
  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };

  const auth = useAuth();
  const login = useCallback((e) => {
      e.preventDefault();
      auth.signIn(value, valuePassword);
    },
    [auth, value, valuePassword]
  );

  if (auth.user) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <section className={loginStyle.login}>
      <form className={loginStyle.form} onSubmit={login}>
        <h1 className="pb-6 text text_type_main-medium">Вход</h1>
        <div className='pb-6'>
          <EmailInput className={loginStyle.input} 
            name={'email'} 
            value={value} 
            onChange={onChangeEmail}/>
        </div>
        <div className='pb-6'>
          <PasswordInput className={loginStyle.input} 
            name={'password'}
            value={valuePassword} 
            onChange={onChangePassword} />
        </div>
        <div className="pb-20 text">
          <Button>Войти</Button>
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
export default Login;