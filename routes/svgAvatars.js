var express = require('express');
var router = express.Router();

router.post('/*', function(req, res, next) {

    console.log("IN SVG SHIT");
    console.log(req.body);
    res.status(200).send("saved");
});

module.exports = router;
