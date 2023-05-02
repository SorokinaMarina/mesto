export class UserInfo {
    constructor ({profileName, profileProfession}) {
        this._profileName = document.querySelector(profileName);
        this._profileProfession = document.querySelector(profileProfession);
    }

    //Создаёт объект, в котором сохраняет данные со страницы
    getUserInfo () {
        return {
            name: this._profileName.textContent,
            about: this._profileProfession.textContent
        }
    }

    //Получает данные и добавляет их на страницу
    setUserInfo ({name, about}) {
        this._profileName.textContent = name;
        this._profileProfession.textContent = about;
    }
}
