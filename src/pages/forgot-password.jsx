import {
    Input,
    Button,
  } from '@ya.praktikum/react-developer-burger-ui-components';
  import forgotPasswordStyle from './styles-pages.module.css';
  import { Link } from 'react-router-dom';
  import { forgotPassword } from '../services/actions/forgotPasswordActions';
  import { useDispatch, useSelector } from 'react-redux';
  import { useState } from 'react';
  import { Redirect } from 'react-router-dom';

  function ForgotPassword() {
   
    const [value, setValue] = useState('');
    const onChange = e => {
      setValue(e.target.value)
    }

    const fogot = useSelector((store) => store.forgotPasswordReducer.forgotPasswordSuccess);
    const dispatch = useDispatch();

    const forgotHandler = (e) => {
      e.preventDefault();
      dispatch(forgotPassword(value));
    };

    if (fogot) {
      return (
        <Redirect
          to={{
            pathname: '/reset-password'
          }}
        />
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
              <Button>Восстановить</Button>
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
    );
  }
  
  export default ForgotPassword;
  