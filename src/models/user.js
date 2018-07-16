const ApiErrorResponse = require(global.MODELS_PATH+'/error.js')

class User {
  constructor () {
    this._userName = "" 
    this._password = "" 
  }
  fromJson (obj) {
    if (!obj.hasOwnProperty("username")){
      this.setUserName(obj.username)
    } else {
      throw new ApiErrorResponse(400, "username is missing")
    }
    if (!obj.hasOwnProperty("password")){
      this.setPassword(obj.password)
    } else {
      throw new ApiErrorResponse(400, "password is missing")
    }
  }
  toJson () {
    return {
      username: this._username, 
      password: this._password, 
    }
  }
  setUserName (username) {
    this._userName = username
  }
  getUserName () {
    return this._userName
  }
  setPassword (password) {
    this._password = password
  }
  getPassword () {
    return this._password
  }
}
module.exports = User
