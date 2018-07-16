const config = require('config'); 
const ApiErrorResponse = require(global.MODELS_PATH+'/error.js')

class Config {
  constructor () {
   this._httpPort = 80
   this._httpAddr = "localhost"
   this._logLevel = "info"
   this._logPath = "/dev/stdout"
  }
  readConfig () {
   //do nothing because default value filled in constructor
  }
  getHttpPort () {
    return this._httpPort
  }
  setHttpPort (port) {
    if (port) {
      if (port > 0 && port < 65535 ) {
        this._httpPort = port ; 
      } else {
        throw new ApiErrorResponse(400, "The port number is wrong")
      }
    } else {
      throw new ApiErrorResponse(400, "The port is missing")
    }
  }


  getHttpAddr () {
    return this._httpAddr
  }
  setHttpAddr (httpAddr) {
    if (httpAddr) {
      this._httpAddr = httpAddr
    } else {
      throw new ApiErrorResponse(400, "The http address is missing")
    }
  }


  getLogLevel () {
    return this._logLevel
  }
  // TODO Here we should add log level as a enum
  setLogLevel (logLevel) {
    if (logLevel) {
      this._loglevel = logLevel
    } else {
      throw new ApiErrorResponse(400, "The log level is missing")
    }
  }
  getLogPath () {
    return this._logPath
  }
  setLogPath (logPath) {
    if (logPath) {
      this._logPath = logPath
    } else {
      throw new ApiErrorResponse(400, "The log path is missing")
    } 
  }
}

class FileConfig extends Config {
  readConfig () {
    if (config.has("log.level")) {
      this.setLogLevel(config.get('log.level'))
    }
    if (config.has("http_server.port")) {
      this.setHttpPort(config.get('http_server.port'))
    }
    if (config.has("http_server.address")) {
      this.setHttpAddr(config.get('http_server.address'))
    }
    if (config.has("log.path")) {
      this.setLogPath(config.get('log.path'))
    }
  }
}
module.exports = {
 InMemoryConfig: Config, 
 FileConfig: FileConfig
}
