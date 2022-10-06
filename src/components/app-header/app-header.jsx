import headerStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const link = `${headerStyles.header__link} p-5 text text_type_main-default`
const linkActive = `${headerStyles.linkActive} p-5 text text_type_main-default`;
function AppHeader() {
  const [linkState, setLinkState] = useState({
    profile: false,
    constructor: true
  });
  const onClick = (element) => {
    element === 'constructor'
    ? setLinkState({ constructor: true, profile: false })
    : setLinkState({ profile: true, constructor: false })
  }

  return (
    <header className={`${headerStyles.header} pt-4 pb-3`}>
      <nav className={headerStyles.header__nav}>
        <ul className={headerStyles.header__linkBox}>
          <li>
            <Link to='/' className={linkState.constructor ? linkActive : link}
                  onClick={() => onClick('constructor')}>
              <BurgerIcon type={linkState.constructor ? 'primary' : 'secondary'} />
              Конструктор
            </Link>
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
          <Link to='/profile' className={linkState.profile ? linkActive : link} 
                onClick={() => onClick()}>
            <ProfileIcon type={linkState.profile ? 'primary' : 'secondary'} />
            Личный кабинет
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default AppHeader
