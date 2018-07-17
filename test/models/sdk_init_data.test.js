global.MODELS_PATH = __dirname+"/../../src/models";
global.UTILITY_PATH = __dirname+"/../../src/utility";
global.MAIN_PATH = __dirname+"/../../src/";
const expect = require('expect.js');
const assert = require('assert');
const SdkInitData = require(global.MODELS_PATH+'/sdk_init_data.js');
describe ('Test sdk init data models', function () {
  var sdkInitData = null
  beforeEach (function (done) {
    sdkInitData = new SdkInitData()
    done()
  }) 
  describe ('fromJson Test', function () {
    it ('full json', function () {
    })
    it ('miss appkey from json ', function () {
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
