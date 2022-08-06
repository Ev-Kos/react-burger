import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import data from '../../utils/data';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const App = () => {
    return (
      <>
        <AppHeader/>
        <main className={appStyles.content}>
          <BurgerIngredients data={data}/>
          <BurgerConstructor data={data}/>
        </main>
      </>
  
    );
  }
  
  export default App;