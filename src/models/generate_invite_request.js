const ApiErrorResponse = require(global.MODELS_PATH+'/error.js')

class GenerateInviteRequest {
  construct () {
    this._userId = ""
    this._clientId = "" 
    this._appKey = "" 
    this._appUrl = ""
  }
  fromJson (obj) {
    if (!obj.hasOwnProperty("userId")){
      this.setUserId(obj.userId)
    } else {
      throw new ApiErrorResponse(400, "userId is missing")
    }
    if (!obj.hasOwnProperty("clientId")){
      this.setClientId(obj.clientId)
    } else {
      throw new ApiErrorResponse(400, "clientId is missing")
    }

    if (!obj.hasOwnProperty("appKey")){
      this.setAppKey(obj.appKey)
    } else {
      throw new ApiErrorResponse(400, "appKey is missing")
    }

    if (!obj.hasOwnProperty("appUrl")){
      this.setAppUrl(obj.appUrl)
    } else {
      throw new ApiErrorResponse(400, "appUrl is missing")
    }
  }
  toJson () {
    return {
      userId: this._userId, 
      clientId: this._clientId, 
      appKey: this._appKey,
      appUrl: this._appUrl
    }
  }
  setUserId (userId) {
    this._userId = userId
  }
  getUserId () {
    return this._userId
  }
  setClientId (clientId) {
    this._clientId = clientId
  }
  getClientId () {
    return this._clientId
  } 
  setAppKey (appKey) {
    this._appKey = appKey
  }
  getAppKey () {
    return this._appKey
  }
  setAppUrl (appUrl) {
    this._appUrl = appUrl
  }
  getAppUrl () {
    return this._appUrl
  }
}
module.exports = GenerateInviteRequest
