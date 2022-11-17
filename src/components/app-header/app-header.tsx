import headerStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';

const link = `${headerStyles.header__link} p-5 text text_type_main-default`
const linkActive = `${headerStyles.linkActive} p-5 text text_type_main-default`;

export default function AppHeader() {

  const { pathname } = useLocation()
  const {name} = useSelector((store) => store.userReducer.userAuthProfile);
  const userLogin = useSelector((store) => store.userReducer.userLoginSuccess);

  return (
    <header className={`${headerStyles.header} pt-4 pb-3`}>
      <nav className={headerStyles.header__nav}>
        <ul className={headerStyles.header__linkBox}>
          <li>
            <NavLink to='/' className={link}
                  activeClassName={linkActive}
                  exact>
              <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
              Конструктор
            </NavLink>
          </li>
          <li>
            <NavLink to='/feed' className={link}
                  activeClassName={linkActive}
            >
              <ListIcon type={pathname.includes('/feed') ? 'primary' : 'secondary'} />
              Лента заказов
            </NavLink>
          </li>
        </ul>
        <Link to='/' className={headerStyles.header__logo}>
          <Logo/>
        </Link>
        <div className={headerStyles.header__linkProfile}>
          <NavLink to='/profile' className={link} 
                activeClassName={linkActive}
          >
            <ProfileIcon type={userLogin ? 'success' : 'secondary'} />
            {!userLogin ? 'Личный кабинет' : name ? name: 'Личный кабинет'}
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
