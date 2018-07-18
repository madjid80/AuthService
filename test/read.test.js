global.MODELS_PATH = __dirname+"/../src/models";
global.UTILITY_PATH = __dirname+"/../src/utility";
global.MAIN_PATH = __dirname+"/../src";
const sinon = require('sinon')
const expect = require('expect.js');
const assert = require('assert');
const read = require(global.MAIN_PATH+'/read.js');
const InMemoryDb = require(global.UTILITY_PATH+"/db.js").InMemoryDb
const Log = require(global.UTILITY_PATH+"/log.js").Log
describe ('Test Read APIs', function () {
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
    global.db.store("admin@mail.com", "123456", "auth")
    done()
  }) 
  describe ('admin login test', function () {
    it ('forget body in login test', function () {
      read.logIn(req, res)
      assert.equal(res._status, 400)
      assert.equal(res._body.error_code, 400 )  
      assert.equal(res._body.error_message, "Invalid request parameters")  
    })
    it ("password is diffrence", function () {
      req.body = {
        "username":"admin@mail.com",
        "password":"admin"
      }
      read.logIn(req, res)
      assert.equal(res._status, 401)
      assert.equal(res._body.error_code, 401 )  
      assert.equal(res._body.error_message, 
        "Access denied")  
    })
    it ("another user send request", function () {
      req.body = {
        "username":"admin@mail.com",
        "password":"123456"
      }
      read.logIn(req, res)
      assert.equal(res._status, 200)
      assert.equal(res._body.hasOwnProperty("token"),true)
      assert.equal(res._body.hasOwnProperty("createdAt"),true)
      let time = new Date(); 
      assert.equal((new Date(res._body.createdAt)).getDate(),time.getDate())
    })

  })
  
})
