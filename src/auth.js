/**
* The authentication middle ware for check privilliged request over api
* 
**/
const ApiErrorResponse = require(global.MODELS_PATH+'/error.js')

function authenticateRequest (req, res, next) {
  try{
    let body = req.body 
    if(!body){
      throw new ApiErrorResponse(400, "The body is missing")
    }
    next()
  } catch (err) {
    global.log.error(error)
    res.status((error.status) ? error.status : 500 ).send(error.message)
  }
}
module.exports.authenticateRequest = authenticateRequest
