export default class UserInfo {
    constructor({profileName, profileDescription}) {
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);        
    }
    getUserInfo() {        
        return {
          name: this._profileName.innerHTML,
          description: this._profileDescription.innerHTML,
        };
    }
    setUserInfo({name, about}) {
        this._profileName.textContent = name;
        this._profileDescription.textContent = about;
          // записывать owner _id        
    }
}
