import appStyles from './home.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { useDispatch, useSelector } from '../services/hooks';
import { useEffect } from 'react';
import { useAuth } from '../services/auth';
import { getUserData } from '../services/actions/userActions';

export default function HomePage() {
    const userLogin = useSelector((store) => store.userReducer.userLoginSuccess);
    const auth = useAuth();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!userLogin) {
          dispatch(getUserData(auth.user));
        }
    }, [dispatch, userLogin]);
  
    return (
        <main className={appStyles.content}>
            <>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            </>  
        </main>
    ) 
}