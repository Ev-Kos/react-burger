const api = 'https://norma.nomoreparties.space/api/ingredients';

const request = async() => {
    const res = await fetch(api);
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export {request}