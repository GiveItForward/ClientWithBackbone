var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var session = req.session;
    if(session.email && session.userObject){
        res.redirect('/home');
    } else {
        res.render('index', { title: 'Give It Forward' });
    }

});

module.exports = router;
