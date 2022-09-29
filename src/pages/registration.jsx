import {
    EmailInput,
    PasswordInput,
    Input,
    Button,
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import { Link } from "react-router-dom";
  import registrationStyle from "./main.module.css";

  function Registration() {
    return (
      <section className={registrationStyle.page}>
        <form>
          <div className={registrationStyle.wrap}>
            <p className="text text_type_main-medium">Регистрация</p>
            <div className={`${registrationStyle.input} pb-6 pt-6`}>
              <Input
                type="text"
                placeholder="Имя"
              />
            </div>
            <div className={`${registrationStyle.input} pb-6`}>
              <EmailInput name={"email"}/>
            </div>
            <div className={`${registrationStyle.input}`}>
              <PasswordInput name={"password"}/>
            </div>
            <div className="pb-20 pt-6">
              <Button type="primary" size="medium">
                Зарегистрироваться
              </Button>
            </div>
            <p className="text text_type_main-small text_color_inactive">
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
  