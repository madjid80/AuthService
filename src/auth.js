/**
* The authentication middle ware for check privilliged request over api
* 
**/
const ApiErrorResponse = require(global.MODELS_PATH+'/error.js')
const UserToken = require(global.MODELS_PATH+'/user_token.js')

function authenticateRequest (req, res, next) {
  try{
    let token = req.get("token")
    if(!token){
      throw new ApiErrorResponse(401, 'Access denied')
    }
    let username = global.db.restore(token, "tokens")
    if(!username || !global.db.restore(username, "auth")) {
      throw new ApiErrorResponse(401, 'Access denied')
    }
    req.user = username
    next()
  } catch (error) {
    global.log.error(error)
    res.status((error.status) ? error.status : 500 ).send(error.message)
  }
}
module.exports.authenticateRequest = authenticateRequest
