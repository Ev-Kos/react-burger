const apiIngredients = 'https://norma.nomoreparties.space/api/ingredients';
const apiOrderNumber = 'https://norma.nomoreparties.space/api/orders';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

const getIngredients = () => {
    return fetch(apiIngredients)
    .then((res) => checkResponse(res))
}

const getOrderNumber = (data) => {
  return fetch(apiOrderNumber, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ ingredients: data }),
    })
  .then(checkResponse)
  .then((data) => data.order.number)
}


export {getIngredients, getOrderNumber}