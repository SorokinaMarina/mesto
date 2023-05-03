export class UserInfo {
    constructor ({profileName, profileProfession, profileAvatar}) {
        this._name = document.querySelector(profileName);
        this._profession = document.querySelector(profileProfession);
        this._avatar = document.querySelector(profileAvatar);
    }

    //Создаёт объект, в котором сохраняет данные со страницы
    getUserInfo () {
        return {
            name: this._name.textContent,
            about: this._profession.textContent,
            avatar: this._avatar.src
        }
    }

    //Получает данные и добавляет их на страницу
    setUserInfo (data) {
        this._name.textContent = data.name;
        this._profession.textContent = data.about;
        this._avatar.src = data.avatar
    }
}
