var express = require('express');
var request = require('request');
var baseUrl = require('./baseUrl');
var parser = require('json-parser');
var router = express.Router();



var session;


router.get('/', function(req, res, next) {

    session = req.session;

    if(session.email && session.userObject){

        var options = {
            url: baseUrl.tomcat_url + "/users/byuid",
            headers:  {uid: session.userObject.uid}
        };

        request(options, function(error, response, body){
            if(response !== undefined && response.statusCode === 200){
                var user = parser.parse(body);
                session.email = user.email;
                session.userObject = user;
                session.cookie.expires = new Date(Date.now() + (60000 * 30)); // 30 minute session
                res.render("home", { user: session.userObject}); // i need the user object
            } else {
                if (response === undefined) {
                    res.status(404).send(error.message);
                } else {
                    res.status(response.statusCode).send(body);
                }
            }
        });
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
            url: baseUrl.tomcat_url + "/users/byuid",
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
