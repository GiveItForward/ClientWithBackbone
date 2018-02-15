var express = require('express');
var router = express.Router();


var session;


router.get('/', function(req, res, next) {

    session = req.session;

    if(session.email && session.userObject){
        session.cookie.expires = new Date(Date.now() + (60000 * 30)); // 30 minute session
        res.render("home", { user: session.userObject}); // i need the user object
    } else {
        res.redirect("/");
    }
});

module.exports = router;



/*
var express = require('express');
var router = express.Router();
var baseUrl = require('./baseUrl');
var request = require('request');
var parser = require('json-parser');


var session;


router.get('/', function(req, res, next) {

    session = req.session;

    if(session.email && session.userObject){
        session.cookie.expires = new Date(Date.now() + (60000 * 30)); // 30 minute session

        var options = {
            url: baseUrl.base_url + "/users/byuid",
            headers: {uid: session.userObject.uid}
        };

        request(options, function(error, response, body){
            if(response.statusCode === 200){
                console.log(body);
                res.render("home", { user: body}); // i need the user object
            } else {
                res.sendStatus(500)
            }
        });
    } else {
        res.redirect("/");
    }
});

module.exports = router;
*/
