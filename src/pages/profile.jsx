import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyle from './styles-pages.module.css';

const navElemActive = `text text_type_main-medium ${profileStyle.navElem}`
const navElem = `text text_type_main-medium text_color_inactive ${profileStyle.navElem}`

function Profile() {
  return (
    <section className={profileStyle.page}>
      <div className={profileStyle.wrap}>
        <div className={profileStyle.profileConteiner}>
          <nav className='pr-30'>
            <ul className={profileStyle.nav}>
              <li className={navElemActive}>
                Профиль
              </li>
              <li className={navElem}>
                История Заказов
              </li>
              <li
                style={{ cursor: 'pointer' }}
                className={navElem}>
                Выход
              </li>
              <li className='pt-20 text text_type_main-small text_color_inactive'>
                В этом разделе вы можете изменить свои персональные данные
              </li>
            </ul>
          </nav>
          <form>
            <div className={profileStyle.userProfile}>
              <div className={profileStyle.input}>
                <Input
                  type={'text'}
                  placeholder={'Имя'}
                  icon={'EditIcon'}
                  name={'name'}
                  error={false}
                  errorText={'Ошибка'}
                  size={'default'}
                />
              </div>
              <div className={`${profileStyle.input} pt-6 pb-6`}>
                <EmailInput
                  name={'email'}
                />
              </div>
              <div className={`${profileStyle.input}`}>
                <PasswordInput
                  name={'password'}
                />
              </div>
              <div className={`${profileStyle.buttons} pt-10`}>
                <Button>Сохранить</Button>
                <Button>Отмена</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Profile;