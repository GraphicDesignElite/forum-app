require('env2')('../config.env');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Alert Server Mode
if (process.env.SERVER === 'development') {
    console.log('Starting In Development Mode');
}

// Connect to DB
var mongoose = require('mongoose');
var passport = require('passport');

require('./models/Posts');
require('./models/Comments');
require('./models/Categories');
require('./models/Users');
require('./models/Config');

require('./config/passport');

mongoose.connect(process.env.DB_URI);
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + process.env.DB_URI);
}); 
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/',  require('./routes/index'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// Error handlers
// development only error handler - prints errors
if (process.env.SERVER === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
    console.log(err);
  });
}

// production error handler - hides errors
app.use(function(err, req, res, next) {
 res.status(err.status || 500);
  res.render('error', {
   message: err.message,
    error: {}
  });
});


module.exports = app;
