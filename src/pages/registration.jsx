import {
    EmailInput,
    PasswordInput,
    Input,
    Button,
  } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import registrationStyle from './styles-pages.module.css';
import { userRegister } from '../services/actions/registerActions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';

function Registration() {
  const [valueName, setValueName] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const dispatch = useDispatch();

  const onChangeName = (e) => {
    setValueName(e.target.value);
  }; 

  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };

  const [valueEmail, setValueEmail] = useState('');
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };

  const onClickRegister = (e) => {
    e.preventDefault();
    dispatch(userRegister(valueName, valueEmail, valuePassword));
  };

  const login = useSelector((store) => store.userReducer.userLoginSuccess);
  if (login) {
    return (
      <Redirect to={{ pathname: '/' }}/>
    );
  }

  return (
    <section className={registrationStyle.page}>
      <form onSubmit={onClickRegister}>
        <div className={registrationStyle.wrap}>
          <p className='text text_type_main-medium'>Регистрация</p>
          <div className={`${registrationStyle.input} pb-6 pt-6`}>
            <Input
              type='text'
              placeholder='Имя'
              onChange={onChangeName}
              value={valueName}
            />
          </div>
          <div className={`${registrationStyle.input} pb-6`}>
            <EmailInput 
              name={'email'}
              onChange={onChangeEmail}
              value={valueEmail}
            />
          </div>
          <div className={`${registrationStyle.input}`}>
            <PasswordInput 
              name={'password'}
              onChange={onChangePassword}
              value={valuePassword}
            />
          </div>
          <div className='pb-20 pt-6'>
            <Button type='primary' size='medium'>
              Зарегистрироваться
            </Button>
          </div>
          <p className='text text_type_main-small text_color_inactive'>
            Уже зарегистрированы?
            <Link to='/login' className={registrationStyle.link}>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
  
export default Registration;
  