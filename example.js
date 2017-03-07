"use strict";
module.exports = {
    getExample(req, res) {
        console.log("Call received to getExample");
        res.send("This is an example!");
    },
    postExample(req, res) {
        console.log("Call received to postExample");
        req.body.received = true;
        res.json(req.body);
    }
};