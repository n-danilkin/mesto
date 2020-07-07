export default class UserInfo {
    constructor({profileName, profileDescription, profileAvatar}) {
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);
        this._profileAvatar =  document.querySelector(profileAvatar)        
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
    }
    setUserAvatar(src) {
        this._profileAvatar.src = src;
    }
}
