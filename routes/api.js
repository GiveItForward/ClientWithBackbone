var express = require('express');
var router = express.Router();
var request = require('request');
var parser = require('json-parser');
var Paypal = require('paypal-adaptive');
var baseUrl = require('./baseUrl');

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
            url: baseUrl.tomcat_url + req.url,
            headers: req.headers
        };

        request(options, function(error, response, body){
            if(response.statusCode === 200){
                var user = parser.parse(body);
                session.email = user.email;
                session.userObject = user;
                session.cookie.expires = new Date(Date.now() + (60000 * 30)); // 30 minute session
                // console.log(response.headers);
                // res.headers = response.headers;
                res.send(body);
            } else {
                res.sendStatus(401);
            }
        });
    }
});


router.post('/paypal/verify/*', function(req, res, next) {
    req.sendStatus(200)
    console.log("in paypal verify: POST");

    console.log(req.url)

    // verify hash from database

    // var hashOptions = {
    //     url: baseUrl.tomcat_url + "/users/verifyhash",
    //     headers: {
    //         hash: hash
    //     }
    // }
    //
    // // verify db hash
    // request(hashOptions, function(error, response, body) {
    //     if(response.statusCode === 200) {
    //         console.log(req.url)
    //
    //     } else {
    //         res.send(response)
    //     }
    // }


    // fulfill request
    // todo - i cannot fulfill the request unless i have the rid and duid. I have the duid, but i don't have the ruid

//     var requestBody;
//
//     var options = {
//         url: baseUrl.tomcat_url + "/requests/fulfill",
//         headers: req.headers
//     };
//
//     request(options, function(error, response, body){
//         if(response.statusCode === 200){
//             requestBody = parser.parse(body);
//             req.session.userObject.donateCount += 1;
//             res.send(paypalResponse.paymentApprovalUrl);
//         } else {
//             console.log("issue with recording fulfilled request");
//             res.sendStatus(500);
//         }
//     });

});


router.get('/requests/paypal', function(req, res, next) {

    session = req.session;


    if(session.email && session.userObject){
        session.cookie.expires = new Date(Date.now() + (60000 * 30)); // 30 minute session

        var options = {
            url: baseUrl.tomcat_url + "/users/byuid",
            headers: req.headers
        };

        // request for the requester email
        request(options, function(error, response, body){
            if(response.statusCode === 200){
                var userBody = parser.parse(body);
                var requestorsEmail = userBody.email;
                var amount = req.header('amt');
                var userDBHash = 'hash';


                // // todo - temporary take out later
                // var requestBody;
                //
                // var options = {
                //     url: baseUrl.tomcat_url + "/requests/fulfill",
                //     headers: req.headers
                // };
                //
                // request(options, function(error, response, body){
                //     if(response.statusCode === 200){
                //         res.send("home");
                //     } else {
                //         res.sendStatus(response);
                //     }
                // }); // take out to here


                var hashOptions = {
                    url: baseUrl.tomcat_url + "/users/gethash",
                    headers: req.headers
                }

                // get the paypal hash from db
                request(hashOptions, function(error, response, body) {
                    if(response.statusCode === 200) {

                        // set up paypal configuration
                        var payload = {
                            requestEnvelope: {
                                errorLanguage:  'en_US'
                            },
                            // ipnNotificationUrl: baseUrl.paypal_url + "/api/paypal/verify", // need IPN Handler for this to work
                            actionType:     'PAY',
                            currencyCode:   'USD',
                            feesPayer:      'SENDER',
                            memo:           'Donating $' + amount + ' to ' + userBody.username + ' via Give It Forward',
                            cancelUrl:      baseUrl.paypal_url + "/home",
                            returnUrl:      baseUrl.paypal_url + "/api/paypal/verify/" + userDBHash,
                            receiverList: {
                                receiver: [
                                    {
                                        email:  'primary@test.com',
                                        amount: amount
                                    }
                                ]
                            }
                        };


                        paypalSdk.pay(payload, function (err, paypalResponse) {
                            if (err) {
                                res.end(err); // TODO - better error handling here
                            } else if(paypalResponse.responseEnvelope.ack === 'Success') {

                                res.send(paypalResponse.paymentApprovalUrl);

                                // var requestBody;
                                //
                                // var options = {
                                //     url: baseUrl.tomcat_url + "/requests/fulfill",
                                //     headers: req.headers
                                // };
                                //
                                // request(options, function(error, response, body){
                                //     if(response.statusCode === 200){
                                //         requestBody = parser.parse(body);
                                //         req.session.userObject.donateCount += 1;
                                //         res.send(paypalResponse.paymentApprovalUrl);
                                //     } else {
                                //         console.log("issue with recording fulfilled request");
                                //         res.sendStatus(500);
                                //     }
                                // });

                            }
                        });


                    } else {
                        console.log(error)
                        req.send(response)
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
        url: baseUrl.tomcat_url + req.url,
        headers: req.headers
    };

    request(options).pipe(res);

});

router.get('/*', function(req, res, next) {
    session = req.session;

    if(session.email && session.userObject){
        session.cookie.expires = new Date(Date.now() + (60000 * 30)); // 30 minute session
        var options = {
            url: baseUrl.tomcat_url + req.url,
            headers: req.headers
        };

        request(options, function (error, response, body) {
            if(response.statusCode === 200){
                res.send(body)
            } else {
                res.sendStatus(response);
            }
        });
    } else {
        res.sendStatus(401);
    }

});



// todo - issues with post and session
router.post('/users/create', function(req, res, next) {
    session = req.session;

    var options = {
        method: 'post',
        body: req.body,
        url: baseUrl.tomcat_url + req.url,
        json: true
    };

    request(options, function(error, response, body){
        if(response.statusCode === 200){
            session.email = body.email;
            session.userObject = body;
            res.send(body);
        } else {
            res.sendStatus(500);
        }
    });


});

router.post('/*', function(req, res, next) {
    session = req.session;


    if(session.email && session.userObject){
        var options = {
            method: 'post',
            body: req.body,
            url: baseUrl.tomcat_url + req.url,
            json: true
        };

        request(options, function (error, response, body) {
            if(response.statusCode === 200){
                res.send(body)
            } else {
                res.sendStatus(500);
            }
        });
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
            url: baseUrl.tomcat_url + req.url,
            json: true
        };

        request(options, function (error, response, body) {
            if(response.statusCode === 200){
                res.send(body)
            } else {
                res.sendStatus(500);
            }
        });
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
            url: baseUrl.tomcat_url + req.url,
            json: true
        };

        request(options, function (error, response, body) {
            if(response.statusCode === 200){
                res.send(body)
            } else {
                res.sendStatus(500);
            }
        });
    } else {
        res.sendStatus(401);
    }
});

router.options("/*", function(req, res, next){
    console.log("IN OPTIONS");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Access-Control-Allow-Headers, Authorization, X-Requested-With, email, password, uid, username, bio, rid, amt, oid');
    res.sendStatus(200);
});


module.exports = router;
