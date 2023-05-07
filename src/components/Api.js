export class Api {
    constructor (baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getResponseData (response) {
        if(response.ok) {
            return response.json()
        } else {
            return Promise.reject(`Ошибка ${response.status}`)
        }
    }

    getCards () {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(response => {
            return this._getResponseData(response);
        })
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
            return this._getResponseData(response);
        })
    }

    getUserInfo() {
        return fetch (`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then((response) => {
            return this._getResponseData(response);
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
            return this._getResponseData(response);
        })
    }

    deleteCard(cardId) {
        return fetch (`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })
        .then(response => {
            return this._getResponseData(response);
        })
    }

    addLike (cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers
        })
        .then(response => {
            return this._getResponseData(response);
        })
    }

    deleteLike (cardId) {
        return fetch (`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(response => {
            return this._getResponseData(response);
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
            return this._getResponseData(response);
        })
    }

    getInitialInfo() {
        return Promise.all([this.getUserInfo(), this.getCards()]);
    }
}