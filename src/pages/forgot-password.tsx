import {
    Input,
    Button,
  } from '@ya.praktikum/react-developer-burger-ui-components';
import forgotPasswordStyle from './styles-pages.module.css';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/actions/forgotPasswordActions';
import { useDispatch, useSelector } from '../services/hooks';
import { useState, FormEvent, ChangeEvent } from 'react';
import { Redirect } from 'react-router-dom';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const fogotPass = useSelector((store) => store.forgotPasswordReducer.forgotPasswordSuccess);
  const userLogin = useSelector((store) => store.userReducer.userLoginSuccess);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const forgotHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(value));
  };

  if (userLogin) {
    return (
      <Redirect to={{ pathname: '/' }}/>
    );
  }

  if (fogotPass) {
    return (
      <Redirect to={{ pathname: '/reset-password' }}/>
    );
  }

  return (
    <section className={forgotPasswordStyle.page}>
      <form onSubmit={forgotHandler}>
        <div className={forgotPasswordStyle.wrap}>
          <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
          <div className={`${forgotPasswordStyle.input} pb-6 pt-6`}>
            <Input
              type='email'
              placeholder='Укажите e-mail'
              value={value}
              onChange={onChange}
            />
          </div>
          <div className='pb-20'>
            <Button htmlType='submit'>Восстановить</Button>
          </div>
          <p className='text text_type_main-small text_color_inactive'>
            Вспомнили пароль?
            <Link to='/login' className={forgotPasswordStyle.link}>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}
  