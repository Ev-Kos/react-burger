import headerStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const link = `${headerStyles.header__link} p-5 text text_type_main-default`
const linkActive = `${headerStyles.linkActive} p-5 text text_type_main-default`;
const AppHeader = () => {
  return (
    <header className={`${headerStyles.header} pt-3 pb-4`}>
      <nav className={headerStyles.header__nav}>
        <ul className={headerStyles.header__linkBox}>
          <li>
            <a href='#' className={linkActive}>
              <BurgerIcon type="primary" />
              Конструктор
            </a>
          </li>
          <li>
            <a href='#' className={link}>
              <ListIcon type="secondary" />
              Лента заказов
            </a>
          </li>
        </ul>
        <a href="#" className={headerStyles.header__logo}>
          <Logo/>
        </a>
        <div className={headerStyles.header__linkProfile}>
          <a href='#' className={link}>
            <ProfileIcon type="secondary" />
            Личный кабинет
          </a>
        </div>
      </nav>
    </header>
  )
}

export default AppHeader
