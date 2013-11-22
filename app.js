
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var five = require("johnny-five"),
    board, servo;
var http = require('http');
var path = require('path');

var servo;
board = new five.Board();

board.on("ready", function() {
	servo = new five.Servo(10);
	servo.center();

});


var app = express();




// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/servo/min', function(req, res){
    servo.min();
    res.send('servo min...');
});
app.get('/servo/max', function(req, res){
    servo.max();
    res.send('servo max...');
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
