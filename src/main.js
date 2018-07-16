const express = require('express')
const Config = require("./utility/config.js")
const Log = require("./utility/log.js")
const http_server = express()
const router = require("./router.js")

global.config = new Config.FileConfig()
global.config.readConfig()
global.log = new Log.Console(); 

//TODO I sould add versioning here
http_server.use('/prospects/', router)
http_server.listen(global.config.getHttpPort(), 
  global.config.getHttpAddr(),
  () => {
    global.log.info("Server Started on "+
      global.config.getHttpAddr()+":"+
      global.config.getHttpPort()) 
  })
