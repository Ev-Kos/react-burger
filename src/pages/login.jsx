import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import loginStyle from './login.module.css';

function Login() {
  return (
    <section className={loginStyle.login}>
      <form className={loginStyle.form}>
        <h1 className="pb-6 text text_type_main-medium">Вход</h1>
        <div className={`${loginStyle.input} pb-6`}>
          <EmailInput name={'email'} />
        </div>
        <div className={`${loginStyle.input} pb-6`}>
          <PasswordInput name={'password'} />
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