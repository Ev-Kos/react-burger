import {
    Input,
    PasswordInput,
    Button,
  } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import registrationStyle from './styles-pages.module.css';
import { userRegister } from '../services/actions/registerActions';
import { useDispatch, useSelector } from '../services/hooks';
import { Redirect } from 'react-router-dom';
import { useState, ChangeEvent, FormEvent } from 'react';

function Registration() {
  const [valueName, setValueName] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const dispatch = useDispatch();

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setValueName(e.target.value);
  }; 

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value);
  };

  const [valueEmail, setValueEmail] = useState('');
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
  };

  const onClickRegister = (e: FormEvent) => {
    e.preventDefault();
    dispatch(userRegister(valueName, valueEmail, valuePassword));
  };

  const register = useSelector((store) => store.registerReducer.registrationSuccess);
 
  if (register) {
    return (
      <Redirect to={{ pathname: '/login' }}/>
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
            <Input 
              type='email'
              name={'email'}
              placeholder='E-mail'
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
            <Button htmlType='submit' type='primary' size='medium'>
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
  