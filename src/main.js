global.MODELS_PATH = __dirname+"/models";
global.UTILITY_PATH = __dirname+"/utility";
global.MAIN_PATH = __dirname;

const express = require('express')
const bodyParser = require('body-parser')
const Config = require("./utility/config.js")
const Log = require("./utility/log.js")
const http_server = express()
const https = require('https')
const router = require("./router.js")
const fs = require('fs')
const InMemoryDb = require(global.UTILITY_PATH+"/db.js").InMemoryDb


global.config = new Config.FileConfig()
global.config.readConfig()
global.log = new Log.Console(); 
global.db = new InMemoryDb();
global.db.store("admin@mail.com", "123456", "auth")

//TODO I sould add versioning here
http_server.use(bodyParser.json())
http_server.use('/prospects/', router)
https.createServer({
  key: fs.readFileSync(__dirname+'/../https_cert/server.key'),
  cert: fs.readFileSync(__dirname+'/../https_cert/server.cert')
}, http_server)
.listen(global.config.getHttpPort(), 
  global.config.getHttpAddr(),
  () => {
    global.log.info("Server Started on "+
      global.config.getHttpAddr()+":"+
      global.config.getHttpPort()) 
  })
