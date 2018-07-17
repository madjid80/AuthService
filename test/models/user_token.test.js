global.MODELS_PATH = __dirname+"/../../src/models";
global.UTILITY_PATH = __dirname+"/../../src/utility";
global.MAIN_PATH = __dirname+"/../../src/";
const expect = require('expect.js');
const assert = require('assert');
const UserToken = require(global.MODELS_PATH+'/user_token.js');
describe ('Test user token models', function () {
  var userToken = null
  beforeEach (function (done) {
    userToken = new UserToken()
    done()
  }) 
  describe ('fromJson Test', function () {
    it ('full json', function () {
    })
    it ('miss token from json ', function () {
    })
    it ('miss createdAt from json', function () {
    })
  })
  describe ('ToJson Test', function () {
    it ('full json', function () {
    })
    it ('default json', function () {
    })
  })
  describe ('set and get token', function () {
    it ('set and get valid token', function () {
    })
    it ('set and get not valid token', function () {
    })
  })
  describe ('set and get createdAt', function () {
    it ('set and get valid createdAt', function () {
    })
    it ('set and get not valid createdAt', function () {
    })
  })
  describe ('generate token', function () {
    it ('generate new token', function () {
    })
  })
  describe ('is valid token tests', function () {
    it ('generate new token', function () {
    })
  })
})
