var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/*', function(req, res, next) {

    // run php script
    console.log("IN SVG SHIT");
    console.log(req.body.imgdata);

    fs.writeFile("/svgavatars/ready-avatars/" + req.body.filename, req.body.imgdata, function(err) {
        if(err) {
            return console.log(err);
            res.status(200).send("error");

        }

        console.log("The file was saved!");
        res.status(200).send("saved");

    });
});

module.exports = router;
