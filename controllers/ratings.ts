import {MongoClient} from 'mongodb';
import * as errors from "../models/errors"
import url from "../db/db";

export const updateRating = (req , res) => {
    try {
        if (!req.headers.token || !req.headers.name) {
            throw errors.parameterRequaire("Name and token");
        }
        MongoClient.connect(url , function (err , db) {
            try {
                if (err) throw err;
                const rating = req.body.rating;
                const insightId = req.body.insightId;
                const banks = db.collection('banks').find({
                    bankName: req.headers.name ,
                    token: req.headers.token
                }).toArray(function (err , mongoRes) {
                    if (err) throw err;
                    if (!mongoRes.length)
                        throw errors.autonticationError();
                });
                const insights = db.collection('insights');
                try {
                    insights.updateOne({id: insightId}
                        , {$inc: {rating, numberOfUsers: 1}} , function (err , result) {
                            if (err) throw err;
                            db.close();
                            res.send({ok:"ok"});
                        });
                } catch (err) {
                    res.status(err.errorCode || 401).send(err);
                }
            } catch (err) {
                res.status(err.errorCode || 401).send(err);
            }
        });
    }
    catch (err) {
        res.status(err.errorCode || 500).send(err);
    }
}

export const updateFeedback = (req , res) => {
    try {
        if (!req.headers.token || !req.headers.name) {
            throw errors.parameterRequaire("Name and token");
        }
        MongoClient.connect(url , function (err , db) {
            try {
                if (err) throw err;
                const feedback = req.body.feedback;
                const insightId = req.body.id;
                const banks = db.collection('banks').find({
                    bankName: req.headers.name ,
                    token: req.headers.token
                }).toArray(function (err , mongoRes) {
                    if (err) throw err;
                    if (!mongoRes.length)
                        throw errors.autonticationError();
                });
                const insights = db.collection('insights');
                try {
                    insights.updateOne({id: insightId}
                        , {$push: {feedback: feedback}} , function (err , result) {
                            if (err) throw err;
                            db.close();
                            res.send({ok:"ok"});
                        });
                } catch (err) {
                    res.status(err.errorCode || 401).send(err);
                }
            } catch (err) {
                res.status(err.errorCode || 401).send(err);
            }
        });
    }
    catch (err) {
        res.status(err.errorCode || 500).send(err);
    }
}
