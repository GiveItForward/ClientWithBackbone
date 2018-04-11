var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var baseUrl = require('./baseUrl');
var parser = require('json-parser');


router.post('/*', function(req, res, next) {

    var session = req.session;

    if(session.email && session.userObject) {
        fs.writeFile(__dirname + "/../public/svgavatars/ready-avatars/" + req.body.filename, req.body.imgdata, function (err) {
            if (err) {
                return console.log(err);
                res.status(200).send("error");

            } else {
                console.log("The file was saved!");
                var options = {
                    method: 'post',
                    body: '/svgavatars/ready-avatars/' + "user-" + session.userObject.uid,
                    url: baseUrl.tomcat_url + "/svgavatars",
                    headers: {uid: session.userObject.uid}
                };

                request(options, function (error, response, body) {
                    if (response.statusCode === 200) {
                        var user = parser.parse(body);

                        session.userObject = user;
                        console.log(user);
                        res.status(200).send("saved");
                    } else {
                        res.status(200).send("error");
                    }
                });
            }
        });
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;
