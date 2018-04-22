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

    setupCORSResponse(res, req.headers.origin);
    session = req.session;

    if(session.email && session.userObject){
        res.redirect("/home");
    } else {
        var options = {
            url: baseUrl.tomcat_url + req.url,
            headers: req.headers
        };

        request(options, function(error, response, body){
            console.log(response);
            console.log(error);
            if(response !== undefined && response.statusCode === 200){
                var user = parser.parse(body);
                session.email = user.email;
                session.userObject = user;
                session.cookie.maxAge = new Date(Date.now() + (60000 * 30)); // 30 minute session
                res.send(body);
            } else {
                if (response === undefined){
                    res.status(404).send(error.message);
                } else {
                    res.status(response.statusCode).send(body);
                }

            }
        });
    }
});


router.post('/paypal/verify/*', function(req, res, next) {
    req.sendStatus(200)

    setupCORSResponse(res, req.headers.origin);


    console.log("in paypal verify: POST");

    console.log(req.url);

    res.redirect("/home");

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
//             res.send(response)
//         }
//     });

});

//
// router.get('/requests/paypal', function(req, res, next) {
//
//     session = req.session;
//
//     setupCORSResponse(res, req.headers.origin);
//
//
//     if(session.email && session.userObject){
//         session.cookie.maxAge = new Date(Date.now() + (60000 * 30)); // 30 minute session
//
//         var options = {
//             url: baseUrl.tomcat_url + "/users/byuid",
//             headers: req.headers
//         };
//
//         // request for the requester email
//         request(options, function(error, response, body){
//             if(response !== undefined && response.statusCode === 200){
//                 var userBody = parser.parse(body);
//                 var requestorsEmail = userBody.email;
//                 var amount = req.header('amt');
//                 var userDBHash = 'hash';
//
//
//                 // // todo - temporary take out later
//                 // var requestBody;
//                 //
//                 // var options = {
//                 //     url: baseUrl.tomcat_url + "/requests/fulfill",
//                 //     headers: req.headers
//                 // };
//                 //
//                 // request(options, function(error, response, body){
//                 //     if(response.statusCode === 200){
//                 //         res.send("home");
//                 //     } else {
//                 //         res.sendStatus(response);
//                 //     }
//                 // }); // take out to here
//
//
//                 var hashOptions = {
//                     url: baseUrl.tomcat_url + "/users/gethash",
//                     headers: req.headers
//                 }
//
//                 // get the paypal hash from db
//                 request(hashOptions, function(error, response, body) {
//                     if(response.statusCode === 200) {
//
//                         // set up paypal configuration
//                         var payload = {
//                             requestEnvelope: {
//                                 errorLanguage:  'en_US'
//                             },
//                             // ipnNotificationUrl: baseUrl.paypal_url + "/api/paypal/verify", // need IPN Handler for this to work
//                             actionType:     'PAY',
//                             currencyCode:   'USD',
//                             feesPayer:      'SENDER',
//                             memo:           'Donating $' + amount + ' to ' + userBody.username + ' via Give It Forward',
//                             cancelUrl:      baseUrl.paypal_url + "/home",
//                             returnUrl:      baseUrl.paypal_url + "/api/paypal/verify/" + userDBHash,
//                             receiverList: {
//                                 receiver: [
//                                     {
//                                         email:  'primary@test.com',
//                                         amount: amount
//                                     }
//                                 ]
//                             }
//                         };
//
//
//                         paypalSdk.pay(payload, function (err, paypalResponse) {
//                             if (err) {
//                                 res.end(err); // TODO - better error handling here
//                             } else if(paypalResponse.responseEnvelope.ack === 'Success') {
//
//                                 res.send(paypalResponse.paymentApprovalUrl);
//
//                                 // var requestBody;
//                                 //
//                                 // var options = {
//                                 //     url: baseUrl.tomcat_url + "/requests/fulfill",
//                                 //     headers: req.headers
//                                 // };
//                                 //
//                                 // request(options, function(error, response, body){
//                                 //     if(response.statusCode === 200){
//                                 //         requestBody = parser.parse(body);
//                                 //         req.session.userObject.donateCount += 1;
//                                 //         res.send(paypalResponse.paymentApprovalUrl);
//                                 //     } else {
//                                 //         console.log("issue with recording fulfilled request");
//                                 //         res.send(response)
//                                 //     }
//                                 // });
//
//                             }
//                         });
//
//
//                     } else {
//                         res.status(paypalResponse.statusCode).send(err);
//                     }
//                 });
//             } else {
//                 console.log("issue with recording fulfilled request");
//                 res.status(response.statusCode).send(body);
//             }
//         });
//     } else {
//         res.sendStatus(401);
//     }
// });


router.get('/requests/paypal', function(req, res, next) {

    setupCORSResponse(res, req.headers.origin);

    session = req.session;

    if(session.email && session.userObject){
        session.cookie.expires = new Date(Date.now() + (60000 * 30)); // 30 minute session

        var options = {
            url: baseUrl.tomcat_url + "/users/byuid",
            headers: req.headers
        };

        // request for the requester email
        request(options, function(error, response, body){

            if(response !== undefined && response.statusCode === 200){
                var userBody = parser.parse(body);
                var requestorsEmail = userBody.email;
                var amount = req.header('amt');
                var randomDBHash = 'hash';

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
                    returnUrl:      baseUrl.paypal_url + "/home",
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
                        res.end(err); // TODO - better error handling here, but what is to be expected from paypal?
                    } else {
                        if(paypalResponse.responseEnvelope.ack === 'Success') {
                            var requestBody;

                            // todo - this needs to happen upon actual payment from paypal.
                            var options = {
                                url: baseUrl.tomcat_url + "/requests/fulfill",
                                headers: req.headers
                            };

                            request(options, function(error, fulfilResponse, fulfilBody){
                                if(fulfilResponse !== undefined && fulfilResponse.statusCode === 200){
                                    requestBody = parser.parse(fulfilBody);
                                    req.session.userObject.donateCount += 1;
                                    var responseObj = {
                                        redirectUrl: paypalResponse.paymentApprovalUrl
                                    };
                                    res.status(200).send(JSON.stringify(responseObj));
                                } else {
                                    if (fulfilResponse === undefined) {
                                        res.status(404).send(error.message);
                                    } else {
                                        res.status(500).send(fulfilBody);
                                    }
                                }
                            });
                        }
                    }
                });
            } else {
                if (response === undefined) {
                    res.status(404).send(error.message);
                } else {
                    res.status(response.statusCode).send(body);
                }

            }
        });
    } else {
        res.sendStatus(401);
    }
});


router.get('/users/logout', function(req, res, next) {

    setupCORSResponse(res, req.headers.origin);

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

    setupCORSResponse(res, req.headers.origin);

    var options = {
        url: baseUrl.tomcat_url + req.url,
        headers: req.headers
    };

    request(options, function(error, response, body){
        if(response !== undefined && response.statusCode === 200){
            res.send(body);
        } else {
            if (response === undefined) {
                res.status(404).send(error.message);
            } else {
                res.status(response.statusCode).send(body);
            }
        }
    });
});

router.get('/resetpassword', function(req, res, next) {

    setupCORSResponse(res, req.headers.origin);

    console.log("IN RESET PASSWORD");
    var options = {
        url: baseUrl.tomcat_url + req.url,
        headers: req.headers
    };

    request(options, function (error, response, body) {
        if(response !== undefined && response.statusCode === 200){
            var responseObj = {
                message: "SUCCESS"
            };
            res.status(200).send(JSON.stringify(responseObj));
        } else {
            if (response === undefined) {
                res.status(404).send(error.message);
            } else {
                res.status(response.statusCode).send(body);
            }
        }
    });

});

router.get('/forgotpassword', function(req, res, next) {

    setupCORSResponse(res, req.headers.origin);

    console.log("IN FORGOT PASSWORD");
    var options = {
        url: baseUrl.tomcat_url + req.url,
        headers: req.headers
    };

    request(options, function (error, response, body) {
        if(response !== undefined && response.statusCode === 200){
            var responseObj = {
                message: "SUCCESS"
            };
            res.status(200).send(JSON.stringify(responseObj));
        } else {
            if (response === undefined) {
                res.status(404).send(error.message);
            } else {
                res.status(response.statusCode).send(body);
            }
        }
    });

});

router.get('/*', function(req, res, next) {

    setupCORSResponse(res, req.headers.origin);

    session = req.session;

    if(session.email && session.userObject){
        session.cookie.maxAge = new Date(Date.now() + (60000 * 30)); // 30 minute session
        var options = {
            url: baseUrl.tomcat_url + req.url,
            headers: req.headers
        };

        request(options, function (error, response, body) {
            if(response !== undefined && response.statusCode === 200){
                res.send(body);
            } else {
                if (response === undefined) {
                    res.status(404).send(error.message);
                } else {
                    res.status(response.statusCode).send(body);
                }
            }
        });
    } else {
        res.sendStatus(401);
    }

});



// todo - issues with post and session
router.post('/users/create', function(req, res, next) {

    setupCORSResponse(res, req.headers.origin);

    session = req.session;

    var options = {
        method: 'post',
        body: req.body,
        url: baseUrl.tomcat_url + req.url,
        json: true,
        headers: req.headers
    };

    request(options, function(error, response, body){
        if(response !== undefined && response.statusCode === 200){

            if (req.header('google') === "true") {
                var user = body;
                session.email = user.email;
                session.userObject = user;
                session.cookie.maxAge = new Date(Date.now() + (60000 * 30)); // 30 minute session
            }
            res.send(body);
        } else {
            if (response === undefined) {
                res.status(404).send(error.message);
            } else {
                res.status(response.statusCode).send(body);
            }
        }
    });


});

router.post('/*', function(req, res, next) {
    setupCORSResponse(res, req.headers.origin);

    session = req.session;

    if(session.email && session.userObject){
        var options = {
            method: 'post',
            body: req.body,
            url: baseUrl.tomcat_url + req.url,
            json: true,
            headers: req.headers
        };

        request(options, function (error, response, body) {
            if(response !== undefined && response.statusCode === 200){
                res.send(body);
            } else {
                if (response === undefined) {
                    res.status(404).send(error.message);
                } else {
                    res.status(response.statusCode).send(body);
                }
            }
        });
    } else {
        res.sendStatus(401);
    }
});

router.put('/*', function(req, res, next) {

    setupCORSResponse(res, req.headers.origin);

    session = req.session;

    if(session.email && session.userObject){
        var options = {
            method: 'put',
            body: req.body,
            url: baseUrl.tomcat_url + req.url,
            json: true,
            headers: req.headers
        };

        request(options, function (error, response, body) {
            if(response !== undefined && response.statusCode === 200){
                res.send(body);
            } else {
                if (response === undefined) {
                    res.status(404).send(error.message);
                } else {
                    res.status(response.statusCode).send(body);
                }
            }
        });
    } else {
        res.sendStatus(401);
    }
});

router.delete('/*', function(req, res, next) {
    setupCORSResponse(res, req.headers.origin);
    session = req.session;

    if(session.email && session.userObject){
        var options = {
            method: 'delete',
            body: req.body,
            url: baseUrl.tomcat_url + req.url,
            json: true,
            headers: req.headers
        };

        request(options, function (error, response, body) {
            if(response !== undefined && response.statusCode === 200){
                res.send(body);
            } else {
                if (response === undefined) {
                    res.status(404).send(error.message);
                } else {
                    res.status(response.statusCode).send(body);
                }
            }
        });
    } else {
        res.sendStatus(401);
    }
});

router.options("/*", function(req, res, next){
    setupCORSResponse(res, req.headers.origin);
    res.sendStatus(200);
});


// global controller
function setupCORSResponse(res, origin){
    var allowedOrigins = ['https://www.giveitforward.us', 'https://giveitforward.us', 'https://localhost:3000', 'localhost:3000'];
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Access-Control-Allow-Headers, Authorization, ' +
        'X-Requested-With, Set-Cookie, email, password, uid, username, bio, rid, amt, oid, duid, search, age, price, rtags, utags, google, stringToCheck, nid');
    // return res;
};


module.exports = router;
