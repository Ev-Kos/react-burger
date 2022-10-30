import profileStyle from './styles-pages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../services/auth';
import { useMemo, useCallback, useEffect } from 'react';
import { Switch, Route, useLocation, NavLink } from 'react-router-dom';
import ProfileForm from '../components/profile-form/profile-form';
import FeedProfile from '../components/feed-profile/feed-profile';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from '../services/actions/wsActions';
import { getCookie } from '../utils/utils';

const navElemActive = `text text_type_main-medium ${profileStyle.navElem_active}`;
const navElemInActive = `text text_type_main-medium ${profileStyle.navElem_inActive}`;

export default function Profile() {
  
  const dispatch = useDispatch();
  const userProfile = useSelector((store) => store.userReducer.userAuthProfile);

  const auth = useAuth();
  const logout = useCallback((e) => {
      e.preventDefault();
      auth.signOut(localStorage.getItem('refreshToken'));
      console.log('token')
    },
    [auth]
  );
 
  useEffect(() => {
    const token = '?token=' + getCookie('token');

    if (userProfile) {
      dispatch({ type: WS_CONNECTION_START, payload: token });
    }

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED, payload: "" });
    };
  }, [userProfile]);

  const feed = useSelector((store) => store.wsReducer.messages);
  let data = null;
  if (feed.length > 0) {
    data = feed[`${feed.length - 1}`].orders;
  }

  const { pathname } = useLocation();

  const description = useMemo(() => {
    switch (pathname) {
      case '/profile': {
        return 'В этом разделе вы можете изменить свои персональные данные';
      }
      case '/profile/orders': {
        return 'В этом разделе вы можете просмотреть свою историю заказов';
      }
      default: {
        return null;
      }
    }
  }, [pathname]);

  return (
    <section className={profileStyle.page}>
      <div className={profileStyle.wrap}>
        <div className={profileStyle.profileConteiner}>
          <nav className='pr-30'>
            <ul className={profileStyle.nav}>
              <li className={profileStyle.navElem}>
                <NavLink className={navElemInActive} to='/profile' activeClassName={navElemActive} exact>
                    Профиль
                </NavLink>
              </li>
              <li className={profileStyle.navElem}>
                <NavLink className={navElemInActive} to='/profile/orders' activeClassName={navElemActive} exact>
                  История Заказов
                </NavLink>
              </li>
              <li className={navElemInActive} onClick={logout}>Выход</li>
              <li className='pt-20 text text_type_main-small text_color_inactive'>
                {description}
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path='/profile' exact={true}>
              <ProfileForm />
            </Route>
            <Route path='/profile/orders' exact={true}>
              <FeedProfile  data={data}/>
            </Route>
          </Switch>
        </div>
      </div>
    </section>
  );
}