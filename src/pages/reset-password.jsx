import resetPasswordStyle from './styles-pages.module.css';
import { Link } from 'react-router-dom';
import {
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
  const [valueToken, setValueToken] = useState('');

  const onClickToken = (e) => {
    e.preventDefault();
    setValueToken(valueToken);
    dispatch(resetPassword(valueToken, valuePassword));
  };

  const userLogin = useSelector((store) => store.userReducer.userLoginSuccess);
  const fogotPass = useSelector((store) => store.forgotPasswordReducer.forgotPasswordSuccess);

  if (userLogin) {
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
            <Input 
              value={valuePassword}
              onChange={(e) => setValuePassword(e.target.value)}
              type='text'
              placeholder='Введите новый пароль'/>
          </div>
          <div className={`${resetPasswordStyle.input}`}>
            <Input
              placeholder='Введите код из письма'
              value={valueToken}
              onChange={(e) => setValueToken(e.target.value)}
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