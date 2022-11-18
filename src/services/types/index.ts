import { store } from '../store';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TForgotPasswordActions } from '../actions/forgotPasswordActions';
import { TIngredientActions } from '../actions/ingredientActions';
import { TIngredientsActions } from '../actions/ingredientsActions';
import { TModalActions } from '../actions/modalActions';
import { TOrderActions } from '../actions/orderActions';
import { TUserRegisterActions } from '../actions/registerActions';
import { TResetPasswordActions } from '../actions/resetPasswordActions';
import { TSelectedIngredientsActions } from '../actions/selectedIngredientsActions';
import { TUserActions } from '../actions/userActions';
import { TWsActions } from '../actions/wsActions';

type TApplicationActions = 
  | TForgotPasswordActions 
  | TIngredientActions
  | TIngredientsActions
  | TModalActions
  | TOrderActions
  | TUserRegisterActions
  | TResetPasswordActions
  | TSelectedIngredientsActions
  | TUserActions
  | TWsActions
  ;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;