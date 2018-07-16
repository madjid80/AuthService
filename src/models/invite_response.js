const ApiErrorResponse = require(global.MODELS_PATH+'/error.js')

class InviteResponse {
  constructor () {
    this._inviteToken = ""
    this._valiTo = "" 
  }
  fromJson (obj) {
    if (obj.hasOwnProperty("inviteToken")) {
      this.setInviteToken(obj.inviteTolen)
    } else {
      throw new ApiErrorResponse(400, "inviteToken is missing")
    }
    if (obj.hasOwnProperty("validTo")) {
      this.setValidTo(obj.validTo)
    } else {
      throw new ApiErrorResponse(400, "validToken is missing")
    }
  }
  toJson () {
    return {
      inviteToken: this._inviteToken,
      validTo: this._validTo
    }
  }
  setInviteToken (inviteToken) {
    this._inviteToken = inviteToken
  }
  getInviteToken () {
    return this._inviteToken
  }
  setValidTo (validTo) {
    this._validTo = validTo
  }
  getValidTo () {
    return this._validTo
  }
}
module.exports = InviteResponse
