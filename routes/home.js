var express = require('express');
var router = express.Router();


var session;


router.get('/', function(req, res, next) {

    session = req.session;

    if(session.email && session.userObject){
        session.cookie.expires = new Date(Date.now() + (60000 * 30)); // 30 minute session
        res.render("home", { user: session.userObject}); // i need the user object
    } else {
        res.redirect("/");
    }
});

module.exports = router;
