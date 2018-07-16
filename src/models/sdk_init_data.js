const ApiErrorResponse = require(global.MODELS_PATH+'/error.js')

class SdkInitData {
  constructor () {
    this._appKey = "" 
    this._appUrl = "" 
  }
  fromJson (obj) {
    if (obj.hasOwnProperty("appKey")) {
      this.setAppKey(obj.appKey)
    } else {
      throw new ApiErrorResponse(400, "appkey is missing")
    }
    if (obj.hasOwnProperty("appUrl")) {
      this.setAppUrl(obj.appUrl)
    } else {
      throw new ApiErrorResponse(400, "appurl is missing")
    }
  }
  toJson () {
    return {
      appKey: this._appKey, 
      appUrl: this._appUrl
    }
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
module.exports = SdkInitData
