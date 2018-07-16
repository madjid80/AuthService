const GenerateInviteRequest = 
  require(global.MODELS_PATH+'/generate_invite_request.js')
const InviteResponse = require(global.MODELS_PATH+'/invite_response.js')
const SdkInitData = require(global.MODELS_PATH+'/sdk_init_data.js')
const ApiErrorResponse = require(global.MODELS_PATH+'/error.js')

function GetOldInvitationToken (inviteRequest) {
  try {
    let tokenTemp = global.db.restore(inviteRequest.getClientId(), 
      "client_tokens")
    if (!tokenTemp) {
      return null 
    }
    let invitationJson = global.db.restore(tokenTemp, "generated_tokens")
    if (!invitationJson) {
      return null 
    }
    let oldInvitation = new InviteResponse()
    oldInvitation.fromJson(invitationJson)
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
      throw new ApiErrorResponse(400, "Invalid request parameters")
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
        invitation.getInviteToken(),
        "client_tokens")
      global.db.store( invitation.getInviteToken(),
        invitation.toJson(),
        "generated_tokens")

    }
    let sdkInitData = new SdkInitData()
    sdkInitData.fromJson(body)
    global.db.store( invitation.getInviteToken(), 
      sdkInitData.toJson(), 
      "sdk_init_client")
    res.send(invitation.toJson()) 
  } catch (error) {
    if (!error.status) {
      error = new ApiErrorResponse(500, "Failed to generate invite")
    }
    global.log.error(error)
    res.status((error.status) ? error.status : 500 ).send(error.toJson())
  }
}
module.exports.generateToken = generateToken
