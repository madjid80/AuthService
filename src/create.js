

/**
 * generate token by admin for user login
 **/
function generateToken (req, res) {
  try {
    res.send("ok") 
  } catch (error) {
    global.log.error(error)
    res.status((error.status) ? error.status : 500 ).send(error.message)
  }
}
module.exports.generateToken = generateToken
