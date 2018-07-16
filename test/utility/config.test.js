var expect = require('expect.js');
var assert = require('assert');
var Config = require(__dirname+'/../../src/utility/config.js');

describe ('Test in memory Configs', function () {
  var config = null
  beforeEach (function (done) {
    config = new Config.InMemoryConfig()
    done()
  }) 
  describe ('set http port', function () {
    it ('set and get 80 port number', function () {
      config.setHttpPort(80)
      assert.equal(config.getHttpPort(), 80)
    })
    it ('set and get -1 as port number', function () {
      expect(config.setHttpPort).withArgs(-1).to.throwException()
      assert(config.getHttpPort(), 80)
    })
    it ('set and get 65536 as port number', function () {
      expect(config.setHttpPort).withArgs(65536).to.throwException()
      assert(config.getHttpPort(), 80)
    })
  })
  describe ('set http address', function () {
    it ('set and get address field', function () {
      config.setHttpAddr("localhost")
      assert.equal(config.getHttpAddr(), "localhost")
    })
  })
  describe ('set log level', function () {
    it ('set and get info to log level', function () {
      config.setLogLevel("info")
      assert.equal(config.getLogLevel(), "info")
    })
  })
  describe ('set log path', function () {
    it ('set and get /dev/stdout to log path', function () {
      config.setLogPath("/dev/stdout")
      assert.equal(config.getLogPath(), "/dev/stdout")
    })
  })
})
describe ('Test file Configs', function () {
  var config = null
  beforeEach (function (done) {
    config = new Config.FileConfig()
    config.readConfig(); 
    done()
  }) 
  describe ('set http port', function () {
    it ('get 80 port number', function () {
      assert.equal(config.getHttpPort(), 80)
    })
    it ('set and get -1 as port number', function () {
      expect(config.setHttpPort).withArgs(-1).to.throwException()
      assert(config.getHttpPort(), 80)
    })
    it ('set and get 65536 as port number', function () {
      expect(config.setHttpPort).withArgs(65536).to.throwException()
      assert(config.getHttpPort(), 80)
    })
  })
  describe ('set http address', function () {
    it ('set and get address field', function () {
      assert.equal(config.getHttpAddr(), "127.0.0.1")
    })
  })
  describe ('set log level', function () {
    it ('set and get info to log level', function () {
      assert.equal(config.getLogLevel(), "info")
    })
  })
  describe ('set log path', function () {
    it ('set and get /dev/stdout to log path', function () {
      assert.equal(config.getLogPath(), "./logs/production.log")
    })
  })
})

