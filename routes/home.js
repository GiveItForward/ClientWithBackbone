var express = require('express');
var router = express.Router();


var session;


router.get('/', function(req, res, next) {

    session = req.session;

    if(session.email && session.userObject){
        res.render("home", { user: session.userObject}); // i need the user object
    } else {
        res.redirect("/");
    }
});

module.exports = router;
