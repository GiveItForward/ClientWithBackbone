var express = require('express');
var baseUrl = require('./baseUrl');
var request = require("request");

var router = express.Router();

router.get('/*', function(req, res, next) {

    console.log("CONFIRM ID");


    var options = {
        url: baseUrl.tomcat_url + "/confirm" +  req.url
    };

    request(options, function (error, response, body) {
        if(response !== undefined && response.statusCode === 200){
            res.redirect("/home");
        } else {
            if (response === undefined) {
                res.status(404).send(error.message);
            } else {
                res.status(response.statusCode).send(body);
            }
        }
    });

});

module.exports = router;
