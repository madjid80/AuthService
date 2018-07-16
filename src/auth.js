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
    if (!error.status) {
      error = new ApiErrorResponse(500, error.message)
    }
    global.log.error(error)
    res.status((error.status) ? error.status : 500 ).send(error.toJson())
  }
}
module.exports.authenticateRequest = authenticateRequest

function throttle (req, res, next) {
  try{
    let ip = req.connection.remoteAddress
    let now = new Date()
    let date = Math.floor(now.getTime()/10000)
    let numOfReq = 
      global.db.restore(ip+":"+date,"throttle")
    if (!numOfReq) {
      numOfReq = 1
    } else if (numOfReq > 10 ) {
      throw new ApiErrorResponse(401, 'too many requests')
    }else {
      numOfReq = parseInt(numOfReq) + 1; 
    }
    global.db.store(ip+":"+date,numOfReq,"throttle")
    //TODO I should delete throttle data after 1 second with an timer event 
    // or I can store throttle data in global array and delete it with timer 
    // (the last solution is not good for multi container)
    next()
  } catch (error) {
    if (!error.status) {
      error = new ApiErrorResponse(500, error.message)
    }
    global.log.error(error)
    res.status((error.status) ? error.status : 500 ).send(error.toJson())
  }
}
module.exports.throttle = throttle
