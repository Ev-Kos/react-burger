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

const getForgotPassword = async(forgotEmail) => {
  return fetch(`${baseUrl}password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({ 'email': forgotEmail })
  })
  .then((res) => checkResponse(res))
}


export {getIngredients, getOrderNumber, getForgotPassword}