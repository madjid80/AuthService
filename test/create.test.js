global.MODELS_PATH = __dirname+"/../src/models";
global.UTILITY_PATH = __dirname+"/../src/utility";
global.MAIN_PATH = __dirname+"/../src";
const sinon = require('sinon')
const expect = require('expect.js');
const assert = require('assert');
const create = require(global.MAIN_PATH+'/create.js');
const InMemoryDb = require(global.UTILITY_PATH+"/db.js").InMemoryDb
const Log = require(global.UTILITY_PATH+"/log.js").Log
describe ('Test Create APIs', function () {
   var req = {}
   var res = {} 
  beforeEach (function (done) {
    global.db = new InMemoryDb();
    global.log = new Log(); 
    req = {
      body: null,
      user: "user@mail.com"
    }
    res = {
      _body: "", 
      _status: 200, 
      status: function (newStatus) {
        this._status = newStatus
        return this
      },
      send: function(message) {
        this._body = message
      }
    }
    
    done()
  }) 
  describe ('generate Token  test', function () {
    it ('miss body test', function () {
      create.generateToken(req, res)
      assert.equal(res._status, 400)
      assert.equal(res._body.error_code, 400 )  
      assert.equal(res._body.error_message, "Invalid request parameters")  
    })
    it ("another user send request", function () {
      req.body = {
        "userId": "aleks@pulseid.com",
        "clientId": 50,
        "appKey": "4d4f434841-373836313836303830-3430-616e64726f6964",
        "appUrl": "https://test.pulseid.com/2.1"
      }
      create.generateToken(req, res)
      assert.equal(res._status, 401)
      assert.equal(res._body.error_code, 401 )  
      assert.equal(res._body.error_message, 
        "Please sent logged in username in userId")  
    })
    it ("another user send request", function () {
      req.body = {
        "userId": "user@mail.com",
        "clientId": 50,
        "appKey": "4d4f434841-373836313836303830-3430-616e64726f6964",
        "appUrl": "https://test.pulseid.com/2.1"
      }
      create.generateToken(req, res)
      assert.equal(res._status, 200)
      assert.equal(res._body.hasOwnProperty("inviteToken"),true)
      assert.equal(res._body.hasOwnProperty("validTo"),true)
      let time = new Date(); 
      time.setDate(time.getDate()+7)
      assert.equal((new Date(res._body.validTo)).getDate(),time.getDate())
    })

  })
  
})
