const User = require(global.MODELS_PATH+'/user.js')
const UserToken = require(global.MODELS_PATH+'/user_token.js')
const InviteResponse = require(global.MODELS_PATH+'/invite_response.js')
const SdkInitData = require(global.MODELS_PATH+'/sdk_init_data.js')
const ApiErrorResponse = require(global.MODELS_PATH+'/error.js')

/**
 * generate token by admin for user login
 **/
function logIn (req, res) {
  try {
    let body = req.body 
    if(!body){
      throw new ApiErrorResponse(400, "Invalid request parameters")
    }
    let user = new User()
    user.fromJson(body)
    let password = global.db.restore(user.getUserName(), "auth")
    if (password != user.getPassword()) {
      throw new ApiErrorResponse(401, "Access denied")
    }
    let userTokenOld = global.db.restore(user.getUserName(), "user_tokens")
    let userToken = new UserToken()
    if (!userTokenOld) {
        userToken.generateToken(user.toJson())
    } else {
      userToken.fromJson(userTokenOld)
      if (!userToken.isValid()) {
        userToken.generateToken(user.toJson())
      }
    } 
    global.db.store(user.getUserName(), userToken.toJson(), "user_tokens")
    //TODO we can forget below link and when we want to authenticate user
    //extract input data from it and if it vlidate then access it
    global.db.store(userToken.getToken(), user.getUserName(), "tokens")
    res.send(userToken.toJson()) 
  } catch (error) {
    if (!error.status) {
      error = new ApiErrorResponse(500, error.message)
    }
    global.log.error(error.toJson())
    res.status((error.status) ? error.status : 500 ).send(error.toJson())
  }
}
module.exports.logIn= logIn

function validateClientToken (req, res) {
  try {
    let body = req.body 
    if (!body) {
      throw new ApiErrorResponse(400, "Invalid invite provided")
    }
    if (!body.hasOwnProperty("inviteToken")) {
      throw new ApiErrorResponse(400, "Invalid invite provided")
    }
    let inviteToken = global.db.restore(body.inviteToken, "generated_tokens")
    if (!inviteToken) {
      throw new ApiErrorResponse(404, "Invite Not Found")
    }
    let invitationObj = new InviteResponse()
    invitationObj.fromJson(inviteToken)
    if (!invitationObj.isValid()) {
      throw new ApiErrorResponse(401, "Invite Expired")
    }
    let sdkInitData = new SdkInitData()
    let tempData = global.db.restore(body.inviteToken, "sdk_init_client")
    if (!tempData) {
      throw new ApiErrorResponse(404, "Invite Not Found")
    }
    sdkInitData.fromJson(tempData)
    res.send(sdkInitData.toJson()) 
  } catch (error) {
    if (!error.status) {
      error = new ApiErrorResponse(500, error.message)
    }
    global.log.error(error)
    res.status((error.status) ? error.status : 500 ).send(error.toJson())
  }
}
module.exports.validateClientToken = validateClientToken
