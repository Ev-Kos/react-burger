import { getCookie } from './utils';

const baseUrl = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

export const getIngredients = () => {
    return fetch(`${baseUrl}ingredients`)
    .then((res) => checkResponse(res))
}

export const getOrderNumber = (data) => {
  return fetch(`${baseUrl}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({ ingredients: data }),
    })
  .then(checkResponse)
  .then((data) => data.order)
}

export const getForgotPassword = (forgotEmail) => {
  return fetch(`${baseUrl}password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({ 'email': forgotEmail })
  })
  .then((res) => checkResponse(res))
}

export const getResetPassword = (resetToken, resetPass) => {
  return fetch(`${baseUrl}password-reset/reset`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ 'password': resetPass, 'token': resetToken })
  })
  .then((res) => checkResponse(res))
}

export const getUserRegister = (userName, userEmail, userPassword) => {
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
  .then((res) => checkResponse(res))
}

export const getUserLogin = (userEmail, userPassword) => {
  return fetch(`${baseUrl}auth/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'},
      body: JSON.stringify({
          'email': userEmail,
          'password': userPassword
      })
  })
  .then((res) => checkResponse(res))
}

export const logoutApi = (token) => {
  return fetch(`${baseUrl}auth/logout`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'},
      body: JSON.stringify({
        'token': token
      })
  })
  .then((res) => checkResponse(res))
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
  .then((res) => checkResponse(res))
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
  .then((res) => checkResponse(res))
}

export const updateUser = (email, password, name) => {
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
  .then((res) => checkResponse(res))
}


