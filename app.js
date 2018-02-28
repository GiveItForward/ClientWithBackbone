var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var moreHelp = require('./routes/moreHelp');
var contactUs = require('./routes/contactUs');
var aboutUs = require('./routes/aboutUs');
var api = require('./routes/api');
var home = require("./routes/home");



var session = require('express-session');
// var users = require('./routes/users');
// var signup = require('./routes/signup');
// var editProfile = require('./routes/editProfile');
// var requestFeed = require('./routes/requestFeed');
// var orgs = require('./routes/orgs');
// var myProfile = require('./routes/myProfile');
// var newRequest = require('./routes/newRequest');
var paypal = require('./routes/paypal');

console.log("hello from app.js");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// for security
app.enable('trust proxy');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// 1-) Connection details
const conObject = {
    user: 'admin',
    password: 'sarabookenziejen',
    host: '54.227.151.133',// or whatever it may be
    port: 5432,
    database: 'postgres'
};

// 2-) Create an instance of connect-pg-simple and pass it session
const pgSession = require('connect-pg-simple')(session);

// 3-) Create a config option for store
const pgStoreConfig = {
    pgPromise: require('pg-promise')({ promiseLib: require('bluebird') })( conObject ), // user either this
    //conString: 'postgres://mehmood:mehmood@localhost:5432/test_db', // or this
    conObject: conObject,// or this,
    // pool: new (require('pg').Pool({ /* pool options here*/}))// or this
}

// 4-) use the store configuration to pgSession instance
app.use(session({
    store: new pgSession(pgStoreConfig),
    secret: 'jW8aor76jpPX', // session secret
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));


// uncomment after placing your favicon in /public
app.use(session({
    // store: new pgSession(pgStoreConfig),
    secret: 'sT12vLR25pQx',
    proxy: true,
    key: session.sid,
    cookie: { secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false
}));

app.use('/', index);
app.use('/index', index);
app.use('/moreHelp', moreHelp);
app.use('/aboutUs', aboutUs);
app.use('/contactUs', contactUs);
app.use('/api', api);
app.use('/home', home);

// app.use('/users', users);
// app.use('/signup', signup);
// app.use('/editProfile', editProfile);
// app.use('/requestFeed', requestFeed);
// app.use('/orgs', orgs);
// app.use('/myProfile', myProfile);
// app.use('/newRequest', newRequest);
// app.use('/paypal', paypal);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;