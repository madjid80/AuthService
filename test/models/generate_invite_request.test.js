global.MODELS_PATH = __dirname+"/../../src/models";
global.UTILITY_PATH = __dirname+"/../../src/utility";
global.MAIN_PATH = __dirname+"/../../src/";
var expect = require('expect.js');
var assert = require('assert');
var GenerateInviteRequest = require(global.MODELS_PATH+'/generate_invite_request.js');
describe ('Test generate invite request models', function () {
  var generateInviteRequest = null
  beforeEach (function (done) {
    generateInviteRequest = new GenerateInviteRequest()
    done()
  }) 
  describe ('fromJson Test', function () {
    it ('full json', function () {
    })
    it ('miss userId from json ', function () {
    })
    it ('miss clientId from json', function () {
    })
    it ('miss appKey from json', function () {
    })
    it ('miss appUrl from json', function () {
    })
  })
  describe ('ToJson Test', function () {
    it ('full json', function () {
    })
    it ('default json', function () {
    })
  })
  describe ('set and get userId', function () {
    it ('set and get valid userId', function () {
    })
    it ('set and get not valid userId', function () {
    })
  })
  describe ('set and get clientId', function () {
    it ('set and get valid clientId', function () {
    })
    it ('set and get not valid clientId', function () {
    })
  })
  describe ('set and get appKey', function () {
    it ('set and get valid appKey', function () {
    })
    it ('set and get not valid appKey', function () {
    })
  })
  describe ('set and get appUrl', function () {
    it ('set and get valid appUrl', function () {
    })
    it ('set and get not valid appUrl', function () {
    })
  })
})

