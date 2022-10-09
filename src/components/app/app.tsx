import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Login from '../../pages/login';
import Registration from '../../pages/registration';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import { ProvideAuth } from '../../services/auth';
import { useAuth } from '../../services/auth';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';

function App() {
  return (
    <>
    <ProvideAuth>
      <AppHeader/>
      <Switch>
        <Route path='/' exact={true}>
          <HomePage />
        </Route>
        <Route path='/login' exact={true}>
          <Login />
        </Route>
        <ProtectedRoute path='/profile' exact={true}>
          <Profile />
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
      </Switch>
    </ProvideAuth>
    </>
  );
}
  
export default App;