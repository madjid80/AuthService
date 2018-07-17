global.MODELS_PATH = __dirname+"/../src/models";
global.UTILITY_PATH = __dirname+"/../src/utility";
global.MAIN_PATH = __dirname+"/../src";
const sinon = require('sinon')
const expect = require('expect.js');
const assert = require('assert');
const auth = require(global.MAIN_PATH+'/auth.js');
const InMemoryDb = require(global.UTILITY_PATH+"/db.js").InMemoryDb
const Log = require(global.UTILITY_PATH+"/log.js").Log
describe ('Test authentication middle ware', function () {
   var req = {}
   var res = {} 
  global.db = new InMemoryDb();
  global.log = new Log(); 
  beforeEach (function (done) {
    req = {
      connection: {
        remoteAddress: "127.0.0.1"
      },
      get: function(text){
        return 'abcd'
      }
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
    global.db.store("abcd","username@mail.com","tokens" )
    global.db.store("username@mail.com","password","auth" )
    done()
  }) 
  describe ('authticate request test', function () {
    it ('valid authenticate', function (done) {
      auth.authenticateRequest(req, res, done)
    })
    it ('request hasnt any token header', function () {
      req.get = (text)=>{return undefined}
      auth.authenticateRequest(req, res, null)
      assert.equal(res._status, 401)
      assert.equal(res._body.error_code, 401 )  
      assert.equal(res._body.error_message, "Access denied")  
    })
    it ('cant find user', function () { 
      req.get = (text)=>{return "zaqw"}
      auth.authenticateRequest(req, res, null)
      assert.equal(res._status, 401)
      assert.equal(res._body.error_code, 401 )  
      assert.equal(res._body.error_message, "Access denied")  
    })
  })
  describe ('throttle', function () {
    beforeEach (function (done) {
      let ip = req.connection.remoteAddress
      let now = new Date()
      let date = Math.floor(now.getTime()/10000)
      global.db.store(ip+":"+date,0, "throttle")

      done()
    })
    it ('valid throttle', function (done) {
      var next = sinon.fake()
      for (let i = 0 ; i < 10 ; i++) {
        auth.throttle(req, res, next)
      }
      assert.equal(next.callCount,10)
      done()
    })
    it ('invalid throttle', function (done) {
      var next = sinon.fake()
      for (let i = 0 ; i < 20 ; i++) {
        auth.throttle(req, res, next)
      }
      assert.equal(next.callCount,11)
      assert.equal(res._status, 401)
      assert.equal(res._body.error_code, 401 )  
      assert.equal(res._body.error_message, "too many requests") 
      
      done()
    })
  })
})
