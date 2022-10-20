import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation
} from 'react-router-dom';
import Login from '../../pages/login';
import Registration from '../../pages/registration';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import IngredientsPage from '../../pages/ingredients';
import Profile from '../../pages/profile';
import FeedPage from '../../pages/feed';
import FeedId from '../feed-id/feed-id';
import PageNotFound from '../../pages/notFound';
import { ProvideAuth } from '../../services/auth';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';
import { Location } from 'history'; 

function App() {
  const location = useLocation<{background: Location}>();
  const background = location.state && location.state.background;
  return (
    <>
    <ProvideAuth>
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
        <Route path='/ingredients/:id' exact={true}>
          <IngredientsPage />
        </Route>
        <Route path='/feed'>
          <FeedPage />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <FeedId />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </ProvideAuth>
    </>
  );
}
  
export default App;