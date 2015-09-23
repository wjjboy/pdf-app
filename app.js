var config = require('./config');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer();
var uuid = require('uuid');
var expressValidator = require('express-validator');
var ejs = require('ejs');
//var redis = require("redis");
var RedisStore = require('connect-redis')(session);

//controller
var filter = require('./routes/filter');
var index = require('./routes/index');
var users = require('./routes/users');
var pdf = require('./routes/pdf');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ type: 'application/json'})); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(upload.array());
app.use(cookieParser());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
  name: 'pdfsession.sid',
  genid: function(req) {
    return uuid.v4();
  },
  //Forces the session to be saved back to the session store
  //connect-redis will touch it
  resave: false,
  saveUninitialized: false,
  secret: 'keyboard cat', 
  store: new RedisStore(config.RedisOptions),
  cookie: { 
    maxAge: config.sessionTime*1000 
  }
}));

// catch lose session error handler
app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('session null')) // handle error
  }
  next() // otherwise continue
});

//routers
app.use('/', index);
app.use('/users', filter.authorize, users);
app.use('/pdf', filter.authorize, pdf);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;
