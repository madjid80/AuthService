const User = require(global.MODELS_PATH+'/user.js')
const UserToken = require(global.MODELS_PATH+'/user_token.js')
const ApiErrorResponse = require(global.MODELS_PATH+'/error.js')

/**
 * generate token by admin for user login
 **/
function logIn (req, res) {
  try {
    let body = req.body 
    if(!body){
      throw new ApiErrorResponse(400, "The body is missing")
    }
    let user = new User()
    user.fromJson(body)
    let password = global.db.restore(user.getUserName(), "auth")
    if (password != user.getPassword()) {
      throw new ApiErrorResponse(401, "Access denied")
    }
    let userTokenOld = global.db.restore(user.getUserName(), "user_tokens")
    let userToken = new UserToken()
    if(!userTokenOld){
        userToken.generateToken(user.toJson())
    } else {
      userToken.fromJson(userTokenOld)
      if(!userToken.isValid()){
        userToken.generateToken(user.toJson())
      }
    } 
    global.db.store(user.getUserName(), userToken.toJson(), "user_tokens")
    //TODO we can forget below link and when we want to authenticate user
    //extract input data from it and if it vlidate then access it
    global.db.store(userToken.getToken(), user.getUserName(), "tokens")
    res.send(userToken.toJson()) 
  } catch (error) {
    global.log.error(error.status)
    global.log.error(error.message)
    res.status((error.status) ? error.status : 500 ).send(error.message)
  }
}
module.exports.logIn= logIn
