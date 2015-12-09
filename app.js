'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var path = require('path');
var calc = require('./calc.js');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname, 'public/favicon.ico')));

app.get('/*', function(req, res){
  var htm = req.params[0] ? req.params[0] : 'index.htm';
  res.sendFile(htm, {root: path.join(__dirname, 'public')});
});

app.post('/calc', function (req, res) { //calculator REST api
  var co = req.body;
  res.send(calc.calculate(co));
});

var server = app.listen(app.get('port'), function(){ //starting nodejs server
  console.log('I am listening on %s', server.address().port);
});
