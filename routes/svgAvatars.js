var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    console.log("IN SVG SHIT");
    console.log(req);
    res.sendStatus(200);
});

module.exports = router;
