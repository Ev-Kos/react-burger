import {
    Input,
    Button,
  } from '@ya.praktikum/react-developer-burger-ui-components';
  import forgotPasswordStyle from './styles-pages.module.css';
  import { Link } from 'react-router-dom';

  function ForgotPassword() {
    return (
      <section className={forgotPasswordStyle.page}>
        <form>
          <div className={forgotPasswordStyle.wrap}>
            <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
            <div className={`${forgotPasswordStyle.input} pb-6 pt-6`}>
              <Input
                type='email'
                placeholder='Укажите e-mail'
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
  