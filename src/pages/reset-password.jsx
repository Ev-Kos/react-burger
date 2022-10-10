import resetPasswordStyle from './styles-pages.module.css';
import { Link } from 'react-router-dom';
import {
    PasswordInput,
    Input,
    Button,
  } from '@ya.praktikum/react-developer-burger-ui-components';
  import { useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { resetPassword } from '../services/actions/resetPasswordActions';
  import { Redirect } from 'react-router-dom';

function ResetPassword() {
  const dispatch = useDispatch();
  const [valuePassword, setValuePassword] = useState('');
  const onChangePassword = e => {
    setValuePassword(e.target.value)
  }
  const [valueToken, setValueToken] = useState('');

  const onChangeToken = e => {
    setValueToken(e.target.value)
  }
  const onClickToken = e => {
    e.preventDefault();
    setValueToken(valueToken);
    dispatch(resetPassword(valueToken, valuePassword));
  }

  const fogotPass = useSelector((store) => store.forgotPasswordReducer.forgotPasswordSuccess);
  const login = useSelector((store) => store.userReducer.userLoginSuccess);

  if (login) {
    return (
      <Redirect to={{ pathname: '/' }}/>
    );
  }
  if (!fogotPass) {
    return (
      <Redirect to={{ pathname: '/forgot-password' }}/>
    );
  }

  return (
    <section className={resetPasswordStyle.page}>
      <form onSubmit={onClickToken}>
        <div className={resetPasswordStyle.wrap}>
          <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
          <div className={`${resetPasswordStyle.input} pb-6 pt-6`}>
            <PasswordInput 
              onChange={onChangePassword} 
              value={valuePassword}/>
          </div>
          <div className={`${resetPasswordStyle.input}`}>
            <Input
              placeholder='Введите код из письма'
              onChange={onChangeToken}
              value={valueToken}
              />
          </div>
          <div className='pb-20 pt-6'>
            <Button>Сохранить</Button>
          </div>
          <p className='text text_type_main-small text_color_inactive'>
            Вспомнили пароль?
            <Link to='/login' className={resetPasswordStyle.link}>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default ResetPassword;