var express = require('express');     
var app = express.Router();
var create = require('./create.js')
var read = require('./read.js')
var auth = require('./auth.js')

function pong(req, res){
  res.send("pong from prospects api ")
}

/**
 * ping for check status of this api
 *
 */
app.get('/ping', pong);
/**
 * generate token by admin
 * 
 **/ 
app.use('/invite/generate', auth.authenticateRequest)
app.post('/invite/generate', create.generateToken)

app.post('/login', read.logIn)
module.exports = app; 
