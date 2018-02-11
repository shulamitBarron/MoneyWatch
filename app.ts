import * as express from 'express';
import * as bodyParser from "body-parser";
import {getInsights, getInsightDetails} from './controllers/getInsights'
import {updateRating, updateFeedback} from './controllers/ratings'

const app = express();

const port = 8090;

function  errorHandler(err, req, res, next) {
    res.status(500)
    res.render('error', { error: err })
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(errorHandler)

app.listen(port,err => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log("server run on port "+port);
});

app.post('/getInsightDetails',getInsightDetails);
app.post('/getInsights', getInsights);
app.post('/getInboxInsights', getInsights);
app.post('/updateInsightRating', updateRating);
app.post('/updateInsightFeedback', updateFeedback);
