import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import Login from '../../pages/login';
import Registration from '../../pages/registration';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import IngredientsPage from '../../pages/ingredients';
import Profile from '../../pages/profile';
import PageNotFound from '../../pages/notFound';
import FeedId from '../feed-id/feed-id';
import Feeds from '../../pages/feeds';
import Modal from '../modal/modal';
import FeedIdModal from '../feed-id-modal/feed-id-modal';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllIngredients } from '../../services/actions/ingredientsActions';
import { getUserData } from '../../services/actions/userActions';
import { useAuth } from '../../services/auth';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from '../../services/actions/wsActions';

function App() {
  const location = useLocation();
  const background = location.state?.background;
  // console.log('background ', background)
  // console.log('location ', location)
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((store) => store.userReducer.userLoginSuccess);
  const auth = useAuth();

  useEffect(() => {
      if (!userLogin) {
        dispatch(getUserData(auth.user));
      }
  }, [dispatch, userLogin]);

  
  function closeModals() {
    history.goBack();
  }

  useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);
  
  return (
    <>
      <AppHeader/>
      <Switch location={background || location}>
        <Route path='/' exact={true}>
          <HomePage />
        </Route>
        <Route path='/login' exact={true}>
          <Login />
        </Route>
        <ProtectedRoute path='/profile' exact={true}>
          <Profile />
        </ProtectedRoute>
        <Route path='/profile/orders' exact={true}>
          <Profile />
        </Route>
        <Route path='/profile/order/:id' exact={true}>
          <FeedId />
        </Route>
        <Route path='/register' exact={true}>
          <Registration />
        </Route>
        <Route path='/forgot-password' exact={true}>
          <ForgotPassword />
        </Route>
        <Route path='/reset-password' exact={true}>
          <ResetPassword />
        </Route>
        <Route path='/feed' exact={true}>
          <Feeds />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <FeedId />
        </Route>
        <Route path='/ingredients/:id' exact={true}>
          <IngredientsPage />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      {background && (
        <Switch>
          <Route path='/ingredients/:id'>
            <Modal closeModal={closeModals} title={'Детали Ингредиента'}>
              <IngredientsPage />
            </Modal>
          </Route>
          <Route path='/feed/:id' exact={true}>
            <Modal closeModal={closeModals} title={'Детали Заказа'}>
              <FeedIdModal />
            </Modal>
          </Route>
          <Route path='/profile/order/:id' exact={true}>
            <Modal closeModal={closeModals} title={'Детали Заказа'}>
              <FeedIdModal />
            </Modal>
          </Route>
        </Switch>
      )} 
    </>
  )
}
  
export default App;