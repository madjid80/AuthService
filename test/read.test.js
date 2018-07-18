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
    
    done()
  }) 

  
})
