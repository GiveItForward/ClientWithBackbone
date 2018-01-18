var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {

    console.log("hello from login.js");


    // if (req.body.password === user.password) {
    // sets a cookie with the user's info
    // req.session.user = user;
    res.render('index', { title: 'Give It Forward' });
    // }

});

module.exports = router;
