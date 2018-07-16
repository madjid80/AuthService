var express = require('express');     
var app = express.Router();

function pong(req, res){
  res.send("pong from prospects api ")
}
/**
 * ping for check status of this api
 *
 */
app.get('/ping', pong);


module.exports = app; 
