import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import data from '../../utils/data';

const App = () => {
    return (
      <>
        <AppHeader/>
        <main className={appStyles.content}>
          <BurgerIngredients data={data}/>
          
        </main>
      </>
  
    );
  }
  
  export default App;