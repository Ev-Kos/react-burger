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
import { IngredientsPage } from '../../pages/ingredients';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import Profile from '../../pages/profile';
import PageNotFound from '../../pages/notFound';
import FeedId from '../feed-id/feed-id';
import Feeds from '../../pages/feeds';
import { Modal } from '../modal/modal';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';
import { useDispatch } from '../../services/hooks';
import { useEffect } from 'react';
import { getAllIngredients } from '../../services/actions/ingredientsActions';
import { DELETE_INGREDIENT_DATA } from '../../services/actions/ingredientActions';
import { CLOSE_INGREDIENT_MODAL } from '../../services/actions/modalActions';

type TLocationState = {
  background?: any;
}

export default function App() {
  const location = useLocation<TLocationState>();
  const background = location.state?.background;
  const history = useHistory();
  const dispatch = useDispatch();

  function closeModals() {
    dispatch({ type: DELETE_INGREDIENT_DATA });
    dispatch({ type: CLOSE_INGREDIENT_MODAL });
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
            <Modal title={''}closeModal={closeModals}>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path='/feed/:id' exact={true}>
            <Modal closeModal={closeModals} title={'Детали Заказа'}>
              <FeedId />
            </Modal>
          </Route>
          <ProtectedRoute path='/profile/order/:id' exact={true}>
            <Modal closeModal={closeModals} title={'Детали Заказа'}>
              <FeedId />
            </Modal>
          </ProtectedRoute>
        </Switch>
      )} 
    </>
  )
}