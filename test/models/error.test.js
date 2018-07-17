global.MODELS_PATH = __dirname+"/../../src/models";
global.UTILITY_PATH = __dirname+"/../../src/utility";
global.MAIN_PATH = __dirname+"/../../src/";
const expect = require('expect.js');
const assert = require('assert');
const ApiErrorResponse = require(global.MODELS_PATH+'/error.js');
describe ('Test error  models', function () {
  var error = null
  beforeEach (function (done) {
    error = new ApiErrorResponse()
    done()
  }) 
  describe ('4xx Error Test', function () {
    it ('400 Error Test Full', function () {
    })
    it ('400 Error without message', function () {
    })
  })
  describe ('5xx Error Test', function () {
    it ('500 Error Test Full', function () {
    })
  })
})
