import { BrowserRouter as Router } from 'react-router-dom';
import App from '../app/app';

export default function AppSwitch() {
  return (
    <Router basename='/react-burger'>
      <App />
    </Router>
  );
}