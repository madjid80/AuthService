var express = require('express');     
var app = express.Router();
var create = require('./create.js')
var read = require('./read.js')
var auth = require('./auth.js')

function pong(req, res){
  res.send("pong from prospects api ")
}

/**
 * ping for check status of this route
 *
 */
app.get('/ping', pong);
/**
 *  Authentication middle ware to prevent unauthorized user access
 *  
 **/
app.use('/invite/generate', auth.authenticateRequest)
/**
 * generate token by admin
 * 
 **/ 
app.post('/invite/generate', create.generateToken)
/**
 * because it's a public API so we need check throttle
 **/
app.use('/invite/validate', auth.throttle)
/**
 * This API only validate generated token
 *
 **/
app.post('/invite/validate', read.validateClientToken)
/**
 * because it's a public API so we need check throttle
 **/
app.use('/login', auth.throttle)

/**
 *  This API is login for admin user
 *  
 **/
app.post('/login', read.logIn)

module.exports = app; 
