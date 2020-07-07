export default class Api {
    constructor({ baseURL, key }) {
        this._baseURL = baseURL;
        this._key = key;
    }
    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getInitialCards() {
        /*
        if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            Надо исправить: базовый адрес сервера 
             и ключ авторизации передавать как параметр
            конструктора класса, а не хардкодить в каждом методе

            В методах использовать данные переданные в констуктор
            Например:
            fetch(`${this.baseUrl}}/cards`, {
                headers: {
                    authorization: this._key
                }
        */
        return fetch(`${this._baseURL}/cards`, {
            headers: {
                authorization: this._key
            }
        })
            .then(res => {
                return this._getResponseData(res);
                // if (res.ok) {
                //     return res.json();
                // }
                // return Promise.reject(`Ошибка: ${res.status}`);             
                /*
                    Можно лучше: проверка ответа сервера и преобразование из json
                    дублируется во всех методах класса Api, лучше вынести в отдельный метод:
                        _getResponseData(res) {
                            if (!res.ok) {
                                return Promise.reject(`Ошибка: ${res.status}`); 
                            }
                            return res.json();
                        }
                    Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
                    не используется вне класса Api   
                */

            })
    }
    getProfileInfo() {
        return fetch(`${this._baseURL}/users/me`, {
            headers: {
                authorization: this._key
            }
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }
    patchProfileInfo({ name, about }) {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._key,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                return this._getResponseData(res);
            })
            .then((res) => {
                return {
                    name: res.name,
                    about: res.about
                }
            })
    }
    postNewCard({ name, link }) {
        return fetch(`${this._baseURL}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._key,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((res) => {
                return this._getResponseData(res);
            })
    }
    putLike(cardId) {
        return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._key
            }
        })
            .then((res) => {
                return this._getResponseData(res);
            })
    }
    deleteLike(cardId) {
        return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._key
            }
        })
            .then((res) => {
                return this._getResponseData(res);
            })
    }
    deleteCard(cardId) {
        return fetch(`${this._baseURL}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._key
            }
        })
            .then((res) => {
                return this._getResponseData(res);
            })
    }
    patchAvatar(avatar) {
        return fetch(`${this._baseURL}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._key,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }
}