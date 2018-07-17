global.MODELS_PATH = __dirname+"/../../src/models";
global.UTILITY_PATH = __dirname+"/../../src/utility";
global.MAIN_PATH = __dirname+"/../../src/";
const expect = require('expect.js');
const assert = require('assert');
const User = require(global.MODELS_PATH+'/user.js');
describe ('Test user models', function () {
  var user = null
  beforeEach (function (done) {
    user = new User()
    done()
  }) 
  describe ('fromJson Test', function () {
    it ('full json', function () {
    })
    it ('miss username from json ', function () {
    })
    it ('miss password from json', function () {
    })
  })
  describe ('ToJson Test', function () {
    it ('full json', function () {
    })
    it ('default json', function () {
    })
  })
  describe ('set and get username', function () {
    it ('set and get valid username', function () {
    })
    it ('set and get not valid username', function () {
    })
  })
  describe ('set and get password', function () {
    it ('set and get valid password', function () {
    })
    it ('set and get not valid password', function () {
    })
  })
})
