var express = require('express');
var router = express.Router();
var request = require('request');
var parser = require('json-parser');
var Paypal = require('paypal-adaptive');


// var base_url = 'http://localhost:8080';
var base_url = 'http://54.227.151.133:8080/giveitforward';

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
        console.log(req.headers);

        var options = {
            url: base_url + "/users/byuid",
            headers: req.headers
        };

        // request for the requestors email
        request(options, function(error, response, body){
            if(response.statusCode === 200){
                var userBody = parser.parse(body);
                var requestorsEmail = userBody.email;
                var amount = req.header('amt');


                var payload = {
                    requestEnvelope: {
                        errorLanguage:  'en_US'
                    },
                    actionType:     'PAY',
                    currencyCode:   'USD',
                    feesPayer:      'EACHRECEIVER',
                    memo:           'Chained payment example',
                    cancelUrl:      'http://giveitforward.us/home',
                    returnUrl:      'http://giveitforward.us/home',
                    // cancelUrl:      'http://localhost:3000/home',
                    // returnUrl:      'http://localhost:3000/home',
                    receiverList: {
                        receiver: [
                            {
                                email:  'primary@test.com',
                                amount: amount,
                                primary:'true'
                            },
                            {
                                email:  'secondary@test.com',
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

router.get('/tags', function(req, res, next) {

    var options = {
        url: base_url + req.url,
        headers: req.headers
    };

    request(options).pipe(res);

});

// todo - sessions is messing up sign up getting of all tags during sign up
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
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Access-Control-Allow-Headers, Authorization, X-Requested-With, email, password, uid, username, bio, rid, amt');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.send(200);
});

module.exports = router;
