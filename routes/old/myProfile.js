var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('myProfile', { title: 'Give It Forward' });
});

module.exports = router;
