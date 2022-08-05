import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';

const App = () => {
    return (
      <>
        <AppHeader/>
        <main className={appStyles.content}>
          
        </main>
      </>
  
    );
  }
  
  export default App;