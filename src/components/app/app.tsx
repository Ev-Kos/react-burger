import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <AppHeader/>
        <main className={appStyles.content}>
            <>
            <BurgerIngredients />
            <BurgerConstructor />
            </>  
        </main>
      </DndProvider>
    </>
  );
}
  
export default App;