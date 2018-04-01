var express = require('express');
var baseUrl = require('./baseUrl');
var request = require("request");

var router = express.Router();

router.get('/*', function(req, res, next) {

    console.log("Reset Password");

    var options = {
        url: baseUrl.tomcat_url + "/resetpassword" +  req.url
    };

    res.render('resetPassword', {hash: req.url});

});

module.exports = router;
