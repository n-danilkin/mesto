export default class Api {
    constructor() {

    }
    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-12/cards', {
            headers: {
                authorization: 'cb60a489-6ec1-4e08-8c6a-5f804e99b68e'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json(); // лайки имя линки
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
    getProfileInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-12/users/me', {
            headers: {
                authorization: 'cb60a489-6ec1-4e08-8c6a-5f804e99b68e'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
    patchProfileInfo({ name, about }) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-12/users/me', {
            method: 'PATCH',
            headers: {
                authorization: 'cb60a489-6ec1-4e08-8c6a-5f804e99b68e',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((res) => {
                return {
                    name: res.name,
                    about: res.about
                }
            })
    }
    postNewCard({ name, link }) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-12/cards', {
            method: 'POST',
            headers: {
                authorization: 'cb60a489-6ec1-4e08-8c6a-5f804e99b68e',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
    }
    putLike(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-12/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: 'cb60a489-6ec1-4e08-8c6a-5f804e99b68e'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
    }
    deleteLike(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-12/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: 'cb60a489-6ec1-4e08-8c6a-5f804e99b68e'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
    }
    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-12/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: 'cb60a489-6ec1-4e08-8c6a-5f804e99b68e'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
    }
    patchAvatar(avatar) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-12/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: 'cb60a489-6ec1-4e08-8c6a-5f804e99b68e',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
}