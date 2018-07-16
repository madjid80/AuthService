const ApiErrorResponse = require(global.MODELS_PATH+'/error.js')
const randomString = require('random-strr');
class InviteResponse {
  constructor () {
    this._inviteToken = ""
    this._valiTo = "" 
  }
  fromJson (obj) {
    if (obj.hasOwnProperty("inviteToken")) {
      this.setInviteToken(obj.inviteToken)
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
    this._validTo = new Date(validTo)
  }
  getValidTo () {
    return this._validTo
  }
  isValid () {
    let today = new Date()
    return this.getValidTo().getTime() - today.getTime() > 0
  }
  generate () {
    this.setInviteToken(randomString({ min: 6, max: 12 }))
    let today = new Date()
    today.setDate(today.getDate()+7)
    this.setValidTo(today)
  }
}
module.exports = InviteResponse
