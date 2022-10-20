
import profileStyle from './styles-pages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../services/auth';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import ProfileForm from './profile-form';
import HistoryOrders from './/history-oders';

const navElemActive = `text text_type_main-medium ${profileStyle.navElem_active}`;
const navElemInActive = `text text_type_main-medium ${profileStyle.navElem_inActive}`;

function Profile() {
  const auth = useAuth();
  const logout = useCallback((e) => {
      e.preventDefault();
      auth.signOut(localStorage.getItem('refreshToken'));
    },
    [auth]
  );

  const [linkState, setLinkState] = useState({
    profile: true,
    historyOrders: false
  });

  const onClick = (element) => {
    element === 'profile'
    ? setLinkState({ profile: true, historyOrders: false})
    : setLinkState({ profile: false, historyOrders: true})
  }

  return (
    <section className={profileStyle.page}>
      <div className={profileStyle.wrap}>
        <div className={profileStyle.profileConteiner}>
          <nav className='pr-30'>
            <ul className={profileStyle.nav}>
              <li className={profileStyle.navElem}>
                <Link className={linkState.profile ? navElemActive : navElemInActive} to='/profile' onClick={() => onClick('profile')}>Профиль</Link>
              </li>
              <li className={profileStyle.navElem}>
                <Link className={linkState.historyOrders ? navElemActive : navElemInActive} to='/profile/orders' onClick={() => onClick('historyOders')}>История Заказов</Link>
              </li>
              <li className={navElemInActive} onClick={logout}>Выход</li>
              <li className='pt-20 text text_type_main-small text_color_inactive'>
                В этом разделе вы можете изменить свои персональные данные
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path='/profile' exact={true}>
              <ProfileForm />
            </Route>
            <Route path='/profile/orders' exact={true}>
              <HistoryOrders />
            </Route>
          </Switch>
        </div>
      </div>
    </section>
  );
}

export default Profile;