import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
    <AppHeader/>
    <Router>
      <Switch >
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
      <main className={appStyles.content}>
        <>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </>  
      </main> 
    </>
  );
}
  
export default App;