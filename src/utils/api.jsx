const baseUrl = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

const getIngredients = () => {
    return fetch(`${baseUrl}ingredients`)
    .then((res) => checkResponse(res))
}

const getOrderNumber = (data) => {
  return fetch(`${baseUrl}orders`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ ingredients: data }),
    })
  .then(checkResponse)
  .then((data) => data.order)
}

const getForgotPassword = (forgotEmail) => {
  return fetch(`${baseUrl}password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({ email: forgotEmail })
  })
  .then((res) => checkResponse(res))
}

const getResetPassword = (resetToken, resetPassword) => {
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

const getUserRegister = (userName, userEmail, userPassword) => {
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



export {getIngredients, getOrderNumber, getForgotPassword, getResetPassword, getUserRegister}