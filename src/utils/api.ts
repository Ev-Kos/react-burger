import { getCookie } from './utils';
import {TGetIngredients,
  TGetOrderNumber,
  TPassword,
  TUserRegister,
  TUserLogout} from '../services/types/data'

const baseUrl = 'https://norma.nomoreparties.space/api/';

const checkResponse = <T> (res: Response): Promise<T> => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

export const getIngredients = () => {
    return fetch(`${baseUrl}ingredients`)
    .then((res) => checkResponse<TGetIngredients>(res))
}

export const getOrderNumber = (order: number) => {
  return fetch(`${baseUrl}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({ ingredients: order }),
    })
    .then((res) => checkResponse<TGetOrderNumber>(res))
}

export const getForgotPassword = (forgotEmail: string) => {
  return fetch(`${baseUrl}password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({ 'email': forgotEmail })
  })
  .then((res) => checkResponse<TPassword>(res))
}

export const getResetPassword = (resetToken: string, resetPass: string) => {
  return fetch(`${baseUrl}password-reset/reset`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ 'password': resetPass, 'token': resetToken })
  })
  .then((res) => checkResponse<TPassword>(res))
}

export const getUserRegister = (userName: string, userEmail: string, userPassword: string) => {
  return fetch(`${baseUrl}auth/register`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'},
      body: JSON.stringify({
          email: userEmail,
          password: userPassword,
          name: userName
      })
  })
  .then((res) => checkResponse<TUserRegister>(res))
}

export const getUserLogin = (userEmail: string, userPassword: string) => {
  return fetch(`${baseUrl}auth/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'},
      body: JSON.stringify({
          'email': userEmail,
          'password': userPassword
      })
  })
  .then((res) => checkResponse<TUserRegister>(res))
}

export const logoutApi = (token: string) => {
  return fetch(`${baseUrl}auth/logout`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'},
      body: JSON.stringify({
        'token': token
      })
  })
  .then((res) => checkResponse<TUserLogout>(res))
}

export const updateToken = () => {
  return fetch(`${baseUrl}auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        'token': localStorage.getItem('refreshToken')
      })
  })
  .then((res) => checkResponse<TUserRegister>(res))
}

export const getUser = () => {
  return fetch(`${baseUrl}auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
  .then((res) => checkResponse<TUserRegister>(res))
}

export const updateUser = (email: string, password: string, name: string) => {
  return fetch(`${baseUrl}auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')},
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
    })
  })
  .then((res) => checkResponse<TUserRegister>(res))
}


