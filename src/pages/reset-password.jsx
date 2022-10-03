import resetPasswordStyle from './styles-pages.module.css';
import { Link } from 'react-router-dom';
import {
    PasswordInput,
    Input,
    Button,
  } from '@ya.praktikum/react-developer-burger-ui-components';

function ResetPassword() {
    return (
        <section className={resetPasswordStyle.page}>
          <form>
            <div className={resetPasswordStyle.wrap}>
              <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
              <div className={`${resetPasswordStyle.input} pb-6 pt-6`}>
                <PasswordInput />
              </div>
              <div className={`${resetPasswordStyle.input}`}>
                <Input
                  placeholder='Введите код из письма'/>
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