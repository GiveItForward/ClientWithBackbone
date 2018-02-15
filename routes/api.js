var express = require('express');
var router = express.Router();
var request = require('request');
var parser = require('json-parser');
var Paypal = require('paypal-adaptive');

// var base_url = 'http://localhost:8080';
var base_url = 'http://54.227.151.133:8080/giveitforward';
var paypal_url = 'http://localhost:3000';
// var paypal_url = 'http://www.giveitforward.us/';

var paypalSdk = new Paypal({
    userId:    process.env.USER_ID,
    password:  process.env.PASSWORD,
    signature: process.env.SIGNATURE,
    sandbox:   true //defaults to false
});


var session;
// this will be used for sessions
router.get('/users/login', function(req, res, next) {

    session = req.session;

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
                session.cookie.expires = new Date(Date.now() + (60000 * 30)); // 30 minute session
                res.end(body);
            } else {
                res.sendStatus(401);
            }
        });
    }
});


router.get('/requests/paypal', function(req, res, next) {

    session = req.session;


    if(session.email && session.userObject){
        session.cookie.expires = new Date(Date.now() + (60000 * 30)); // 30 minute session
        console.log(req.headers);

        var options = {
            url: base_url + "/users/byuid",
            headers: req.headers
        };

        // request for the requester email
        request(options, function(error, response, body){
            if(response.statusCode === 200){
                var userBody = parser.parse(body);
                var requestorsEmail = userBody.email;
                var amount = req.header('amt');
                var randomDBHash = 'hash'


                var payload = {
                    requestEnvelope: {
                        errorLanguage:  'en_US'
                    },
                    actionType:     'PAY',
                    currencyCode:   'USD',
                    feesPayer:      'EACHRECEIVER',
                    memo:           'Chained payment example',
                    cancelUrl:      paypal_url + "/home",
                    returnUrl:      paypal_url + "/home",
                    receiverList: {
                        receiver: [
                            {
                                email:  'primary@test.com',
                                amount: amount,
                                primary:'true'
                            },
                            {
                                email:  'secondary@test.com',
                                amount: '10.00',
                                primary:'false'
                            }
                        ]
                    }
                };

                paypalSdk.pay(payload, function (err, paypalResponse) {
                    if (err) {
                        res.end(err);
                    } else {
                        if(paypalResponse.responseEnvelope.ack === 'Success') {


                            var requestBody;

                            // todo - this needs to happen upon actual payment from paypal.
                            var options = {
                                url: base_url + "/requests/fulfill",
                                headers: req.headers
                            };

                            request(options, function(error, response, body){
                                if(response.statusCode === 200){
                                    requestBody = parser.parse(body);
                                    console.log(requestBody);
                                    req.session.userObject.donateCount += 1;
                                } else {
                                    console.log("issue with recording fulfilled request");
                                    res.sendStatus(500);
                                }
                            });
                            res.end(paypalResponse.paymentApprovalUrl);
                        }
                    }
                });
            } else {
                console.log("issue with recording fulfilled request");
                res.sendStatus(500);
            }
        });
    } else {
        res.sendStatus(401);
    }
});


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

// todo - /tags is currently open to the public
router.get('/tags', function(req, res, next) {

    var options = {
        url: base_url + req.url,
        headers: req.headers
    };

    request(options).pipe(res);

});

router.get('/*', function(req, res, next) {
    session = req.session;

    if(session.email && session.userObject){
        session.cookie.expires = new Date(Date.now() + (60000 * 30)); // 30 minute session
        var options = {
            url: base_url + req.url,
            headers: req.headers
        };

        request(options).pipe(res);
    } else {
        res.sendStatus(401);
    }

});



// todo - issues with post and session
router.post('/users/create', function(req, res, next) {
    session = req.session;
    console.log("------------------ in create user");
    console.log(session);


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

router.put('/*', function(req, res, next) {
    session = req.session;


    if(session.email && session.userObject){
        var options = {
            method: 'put',
            body: req.body,
            url: base_url + req.url,
            json: true
        };

        request(options, function (err, res, body) {}).pipe(res);
    } else {
        res.sendStatus(401);
    }
});

router.delete('/*', function(req, res, next) {
    session = req.session;


    if(session.email && session.userObject){
        var options = {
            method: 'delete',
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
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Access-Control-Allow-Headers, Authorization, X-Requested-With, email, password, uid, username, bio, rid, amt');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.send(200);
});

module.exports = router;
