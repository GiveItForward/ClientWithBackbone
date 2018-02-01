var express = require('express');
var router = express.Router();
var request = require('request');
var parser = require('json-parser');


// var base_url = 'http://localhost:8080';
var base_url = 'http://54.227.151.133:8080/giveitforward';


var session;
// this will be used for sessions
router.get('/users/login', function(req, res, next) {

    session = req.session;

    console.log("------------------ in create user");

    if(session.email && session.userObject){
        res.redirect("/home");
    } else {
        var options = {
            url: base_url + req.url,
            headers: req.headers
        };

        request(options, function(error, response, body){
            if(response.statusCode === 200){
                var user = parser.parse(body);
                session.email = user.email;
                session.userObject = user;
                res.end(body);
            } else {
                res.sendStatus(401);
            }
        });
    }
});

/* GET home page. */
router.get('/users/logout', function(req, res, next) {

    session = req.session;
    var userObject = session.userObject;

    if(session.email && session.userObject){ // logout the user
        req.session.destroy(function(err) {
            res.end(JSON.stringify(userObject));
        });
    } else {
        res.sendStatus(401);
    }
});

router.get('/tags', function(req, res, next) {

    var options = {
        url: base_url + req.url,
        headers: req.headers
    };

    request(options).pipe(res);

});


router.get('/*', function(req, res, next) {
    session = req.session;

    // if(session.email && session.userObject){
        var options = {
            url: base_url + req.url,
            headers: req.headers
        };

        request(options).pipe(res);
    // } else {
    //     res.sendStatus(401);
    // }

});


router.post('/users/create', function(req, res, next) {
    session = req.session;
    console.log("------------------ in create user");


    var options = {
        method: 'post',
        body: req.body,
        url: base_url + req.url,
        json: true
    };

    request(options, function(error, response, body){
        console.log("--------------------- body of new user\n" + body);
        if(response.statusCode === 200){
            session.email = body.email;
            session.userObject = body;
            res.end(body);
        } else {
            res.sendStatus(401);
        }
    }).pipe(res);


});

router.post('/*', function(req, res, next) {
    session = req.session;


    if(session.email && session.userObject){
        var options = {
            method: 'post',
            body: req.body,
            url: base_url + req.url,
            json: true
        };

        request(options, function (err, res, body) {}).pipe(res);
    } else {
        res.sendStatus(401);
    }


});

router.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Access-Control-Allow-Headers, Authorization, X-Requested-With, email, password, uid, username, bio');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.send(200);
});

module.exports = router;