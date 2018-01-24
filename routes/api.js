var express = require('express');
var router = express.Router();
var request = require('request');




// var local_url = 'http://localhost:8080';
var base_url = 'http://54.227.151.133:8080/giveitforward';

/* GET home page. */
router.get('/login', function(req, res, next) {
    var options = {
        url: base_url + '/login',
        headers: {
            'email': req.header('email'),
            'password': req.header('password')
        }
    };

    request(options).pipe(res);


});

router.get('/signup', function(req, res, next) {
    var options = {
        url: base_url + '/signup'
    };

    request(options).pipe(res);
});

router.get('/requests', function(req, res, next) {

    console.log(req.path);

    var options = {
        url: base_url + '/requests'
    };

    request(options).pipe(res);

});

router.get('/requests/donateuid', function(req, res, next) {

    console.log(req.path);

    var options = {
        url: base_url + '/requests/donateuid',
        headers: {
            'uid': req.header('uid')
        }
    };

    request(options).pipe(res);

});

router.get('/requests/requestuid', function(req, res, next) {

    console.log(req.path);

    var options = {
        url: base_url + '/requests/requestuid',
        headers: {
            'uid': req.header('uid')
        }
    };

    request(options).pipe(res);

});

router.get('/requests/requestuid/open', function(req, res, next) {

    console.log(req.path);

    var options = {
        url: base_url + '/requests/requestuid/open',
        headers: {
            'uid': req.header('uid')
        }
    };

    request(options).pipe(res);

});

router.get('/organizations', function(req, res, next) {

    var options = {
        url: base_url + '/organizations'
    };

    request(options).pipe(res);

});

router.get('/users', function(req, res, next) {

    var options = {
        url: base_url + '/users'
    };

    request(options).pipe(res);

});

router.get('/tags', function(req, res, next) {

    var options = {
        url: base_url + '/tags'
    };

    request(options).pipe(res);

});

router.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Access-Control-Allow-Headers, Authorization, X-Requested-With, email, password, uid, username, bio');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.send(200);
});

module.exports = router;
