var express = require('express');
var router = express.Router();
var request = require('request');




// var local_url = 'http://localhost:8080';
var base_url = 'http://54.227.151.133:8080/giveitforward';


router.get('/*', function(req, res, next) {
    var options = {
        url: base_url + req.url,
        headers: req.headers
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
