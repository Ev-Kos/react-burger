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
    headers: {'Content-Type': 'application/json'},
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
      body: JSON.stringify({ email: forgotEmail })
  })
  .then((res) => checkResponse(res))
}

export const getResetPassword = (resetToken, resetPassword) => {
  return fetch(`${baseUrl}password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        password: resetToken, 
        token: resetPassword 
      })
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
          email: userEmail,
          password: userPassword
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
        token: token
      })
  })
  .then((res) => checkResponse(res))
}

export const updateTokin = () => {
  return fetch(`${baseUrl}auth/token`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'},
      body: JSON.stringify({
        token: getCookie('refreshToken')
      })
  })
  .then((res) => checkResponse(res))
}

export const getUser = () => {
  return fetch(`${baseUrl}auth/user`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')}
  })
  .then((res) => checkResponse(res))
}

export const updateUser = (userName, userEmail, userPassword) => {
  return fetch(`${baseUrl}auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')},
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        name: userName
    })
  })
  .then((res) => checkResponse(res))
}


