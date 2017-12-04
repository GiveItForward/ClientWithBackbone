var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('paypal', { title: 'Give It Forward' });
});

module.exports = router;
