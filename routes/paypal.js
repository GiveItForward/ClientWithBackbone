var express = require('express');
var router = express.Router();
var Paypal = require('paypal-adaptive');
// var process = require('process-env');

var paypalSdk = new Paypal({
    userId:    process.env.USER_ID,
    password:  process.env.PASSWORD,
    signature: process.env.SIGNATURE,
    sandbox:   true //defaults to false
});

var payload = {
    requestEnvelope: {
        errorLanguage:  'en_US'
    },
    actionType:     'PAY',
    currencyCode:   'USD',
    feesPayer:      'EACHRECEIVER',
    memo:           'Chained payment example',
    cancelUrl:      'http://test.com/cancel',
    returnUrl:      'http://giveitforward.us/',
    receiverList: {
        receiver: [
            {
                email:  'primary@test.com',
                amount: '100.00',
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

router.get('/', function(req, res, next) {

    // console.log(env);

    // res.render('paypal', { title: 'Give It Forward' });
    paypalSdk.pay(payload, function (err, paypalResponse) {
         if (err) {
             console.log(err);
         } else {
             // Response will have the original Paypal API response
    //          console.log(paypalResponse);

             if(paypalResponse.responseEnvelope.ack === 'Success') {
                 res.redirect(paypalResponse.paymentApprovalUrl);
             }
         }
    });

});

module.exports = router;