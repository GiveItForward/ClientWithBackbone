var express = require('express');
var router = express.Router();

router.post('/*', function(req, res, next) {

    console.log("IN SVG SHIT");
    console.log(req);
    res.status(200).send(req.body);
});

module.exports = router;
