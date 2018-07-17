global.MODELS_PATH = __dirname+"/../../src/models";
global.UTILITY_PATH = __dirname+"/../../src/utility";
global.MAIN_PATH = __dirname+"/../../src/";
const expect = require('expect.js');
const assert = require('assert');
const InviteResponse = require(global.MODELS_PATH+'/invite_response.js');
describe ('Test invite response models', function () {
  var inviteResponse = null
  beforeEach (function (done) {
    inviteResponse = new InviteResponse()
    done()
  }) 
  describe ('fromJson Test', function () {
    it ('full json', function () {
    })
    it ('miss inviteToken from json ', function () {
    })
    it ('miss validTo from json', function () {
    })
  })
  describe ('ToJson Test', function () {
    it ('full json', function () {
    })
    it ('default json', function () {
    })
  })
  describe ('set and get inviteToken', function () {
    it ('set and get valid inviteToken', function () {
    })
    it ('set and get not valid inviteToken', function () {
    })
  })
  describe ('set and get validTo', function () {
    it ('set and get valid validTo', function () {
    })
    it ('set and get not valid validTo', function () {
    })
  })
  describe ('generate new invite token ', function () {
    it ('generate new token', function () {
    })
  })
  describe ('validate invite token ', function () {
    it ('validate invite token test ', function () {
    })
  })

})
