export class Api {
    constructor (baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getCards () {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            } else {
                return Promise.reject(`Ошибка ${response.status}`)
            }})
        .catch((error) => console.log(`Ошибка ${error}`))
    }

    addCard(card){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: card.title,
                link: card.link
            })
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            } else {
                return Promise.reject(`Ошибка ${response.status}`)
            }})
        .catch((error) => console.log(`Ошибка ${error}`))
    }

    getUserInfo() {
        return fetch (`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then((response) => {
            if(response.ok) {
                return response.json()
            } else {
                return Promise.reject(`Ошибка ${response.status}`)
            }})
        .catch((error) => {
            console.log(`Ошибка ${error}`)
        })
    }

    editUserInfo(data) {
        return fetch (`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            } else {
                return Promise.reject(`Ошибка ${response.status}`)
            }})
        .catch((error) => console.log(`Ошибка ${error}`))
    }

    deleteCard(cardId) {
        return fetch (`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            } else {
                return Promise.reject(`Ошибка ${response.status}`)
            }})
        .catch((error) => console.log(`Ошибка ${error}`));
    }

    addLike (cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            } else {
                return Promise.reject(`Ошибка ${response.status}`)
            }})
        .catch((error) => {
            console.log(`Ошибка ${error}`);
        })
    }

    deleteLike (cardId) {
        return fetch (`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            } else {
                return Promise.reject(`Ошибка ${response.status}`)
            }})
        .catch((error) => {
            console.log(`Ошибка ${error}`);
        })
    }

    editAvatar (data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            } else {
                return Promise.reject(`Ошибка ${response.status}`)
            }
        })
        .catch((error) => {
            console.log(`Ошибка ${error}`);
        })
    }

    getInitialInfo() {
        return Promise.all([this.getUserInfo(), this.getCards()]);
    }
}