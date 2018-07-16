const GenerateInviteRequest = 
  require(global.MODELS_PATH+'/generate_invite_request.js')
const InviteResponse = require(global.MODELS_PATH+'/invite_response.js')
const ApiErrorResponse = require(global.MODELS_PATH+'/error.js')

function GetOldInvitationToken (inviteRequest) {
  try {
    let invitationTemp = global.db.restore(inviteRequest.getClientId(), 
      "client_tokens")
    if (!invitationTemp) {
      return null 
    }
    let oldInvitation = new InviteResponse()
    oldInvitation.fromJson(invitationTemp)
    return oldInvitation
  } catch(e) {
    throw e
  }
}
/**
 * generate token by admin for user login
 **/
function generateToken (req, res) {
  try {
    let body = req.body 
    if(!body){
      throw new ApiErrorResponse(400, "The body is missing")
    }
    let generateInviteRequest = new GenerateInviteRequest()
    generateInviteRequest.fromJson(body)
    if(req.user != generateInviteRequest.getUserId()){
      throw new ApiErrorResponse(401, 
        "Please sent logged in username in userId")
    }
    let invitation = GetOldInvitationToken(generateInviteRequest)
    if(!invitation || !invitation.isValid()){
      invitation = new InviteResponse()
      invitation.generate()
      global.db.store(generateInviteRequest.getClientId(), 
        invitation.toJson(),
        "client_tokens")
    }
    res.send(invitation.toJson()) 
  } catch (error) {
    global.log.error(error)
    res.status((error.status) ? error.status : 500 ).send(error.message)
  }
}
module.exports.generateToken = generateToken
