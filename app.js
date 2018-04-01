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
var svgAvatars = require('./routes/svgAvatars');
var confirmEmail = require("./routes/confirmEmail");
var resetPassword = require("./routes/resetPassword");


var session = require('express-session');

console.log("hello from app.js\n");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var environment = process.env.NODE_ENV;

console.log(" ------------------------ Starting app.js ------------------------");
console.log("-------------------- in " + environment + " environment --------------------");

// if i am the production database, then set up a session store correctly
if (environment === 'production'){

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
        // pgPromise: require('pg-promise')({ promiseLib: require('bluebird') })( conObject ), // user either this
        //conString: 'postgres://mehmood:mehmood@localhost:5432/test_db', // or this
        conObject: conObject,// or this,
        // pool: new (require('pg').Pool({ /* pool options here*/}))// or this
    }

    // for security
    app.set('trust proxy', true);

    // 4-) use the store configuration to pgSession instance
    app.use(session({
        secret: 'jW8aor76jpPX', // session secret
        proxy: true,
        resave: false,
        key: session.sid,
        saveUninitialized: false,
        cookie: { secure: true, maxAge: new Date(Date.now() + (60000 * 30)) }, // 30 minute session
        store: new pgSession(pgStoreConfig)
    }));
} else { // local session store for dev env
    app.use(session({
        secret: 'jW8aor76jpPX', // session secret
        resave: false,
        key: session.sid,
        saveUninitialized: false
    }));
}


app.use('/', index);
app.use('/index', index);
app.use('/moreHelp', moreHelp);
app.use('/aboutUs', aboutUs);
app.use('/contactUs', contactUs);
app.use('/api', api);
app.use('/home', home);
app.use('/svgavatars', svgAvatars);
app.use('/confirm', confirmEmail);
app.use('/resetpassword', resetPassword);

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