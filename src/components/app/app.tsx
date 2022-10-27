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
import { Location } from 'history'; 
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllIngredients } from '../../services/actions/ingredientsActions';

function App() {
  const location = useLocation<{background: Location}>();
  const background = location.state?.background;
  const history = useHistory();
  const dispatch: any = useDispatch();
  
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
        <ProtectedRoute path='/profile/orders' exact={true}>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/profile/order/:id' exact={true}>
          <FeedId />
        </ProtectedRoute>
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
          <Route path='/ingredients/:id' exact={true}>
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
            <Modal
              closeModal={closeModals} title={'Детали Заказа'}>
              <FeedIdModal />
            </Modal>
          </Route>
        </Switch>
      )}
    </>
  )
}
  
export default App;