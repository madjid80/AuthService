const ApiErrorResponse = require(global.MODELS_PATH+'/error.js')
var token = require("token")
token.defaults.secret = 'AAB';
token.defaults.timeStep = 24 * 60 * 60;

class UserToken {
  constructor () {
    this._token = ""
    this._createdAt = ""
  }
  fromJson (obj) {
    if (obj.hasOwnProperty("token")) {
      this.setToken(obj.token)
    } else {
      throw new ApiErrorResponse(400, "token is missing")
    }
    if (obj.hasOwnProperty("createdAt")) {
      this.setCreatedAt(obj.createdAt)
    } else {
      throw new ApiErrorResponse(400, "createdAt is missing")
    }

  }
  toJson () {
    return {
      token: this._token,
      createdAt: this._createdAt
    }
  }
  setToken (token) {
    this._token = token 
  }
  getToken () {
    return this._token 
  }
  setCreatedAt (createdAt) {
    this._createdAt = createdAt
  }
  getCreatedAt () {
    return this._createdAt
  }
  generateToken (user) {
    this._token = token.generate(JSON.stringify(user))
    this.setCreatedAt(new Date())
  }
  isValid () {
    //TODO validate token base on created time
    return true
  }
}
module.exports = UserToken
