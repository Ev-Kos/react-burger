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

function App() {
  return (
    <>
    <Router>
      <AppHeader/>
      <Switch>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path='/login' exact={true}>
          <Login />
        </Route>
        <Route path='/register' exact={true}>
          <Registration />
        </Route>
        <Route path='/forgot-password' exact={true}>
          <ForgotPassword />
        </Route>
      </Switch>
    </Router>
    </>
  );
}
  
export default App;