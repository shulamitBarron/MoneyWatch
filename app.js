"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var getInsights_1 = require("./controllers/getInsights");
var ratings_1 = require("./controllers/ratings");
var app = express();
var port = process.env.PORT || 8090;
function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(errorHandler);
app.listen(port, function (err) {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log("server run on port " + port);
});
app.post('/getInsightDetails', getInsights_1.getInsightDetails);
app.post('/getInsights', getInsights_1.getInsights);
app.post('/getInboxInsights', getInsights_1.getInsights);
app.post('/updateInsightRating', ratings_1.updateRating);
app.post('/updateInsightFeedback', ratings_1.updateFeedback);
