"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var errors = require("../models/errors");
var db_1 = require("../db/db");
exports.updateRating = function (req, res) {
    try {
        if (!req.headers.token || !req.headers.name) {
            throw errors.parameterRequaire("Name and token");
        }
        mongodb_1.MongoClient.connect(db_1.default, function (err, db) {
            try {
                if (err)
                    throw err;
                var rating = req.body.rating;
                var insightId = req.body.insightId;
                var banks = db.collection('banks').find({
                    bankName: req.headers.name,
                    token: req.headers.token
                }).toArray(function (err, mongoRes) {
                    if (err)
                        throw err;
                    if (!mongoRes.length)
                        throw errors.autonticationError();
                });
                var insights = db.collection('insights');
                try {
                    insights.updateOne({ id: insightId }, { $inc: { rating: rating, numberOfUsers: 1 } }, function (err, result) {
                        if (err)
                            throw err;
                        db.close();
                        res.send({ ok: "ok" });
                    });
                }
                catch (err) {
                    res.status(err.errorCode || 401).send(err);
                }
            }
            catch (err) {
                res.status(err.errorCode || 401).send(err);
            }
        });
    }
    catch (err) {
        res.status(err.errorCode || 500).send(err);
    }
};
exports.updateFeedback = function (req, res) {
    try {
        if (!req.headers.token || !req.headers.name) {
            throw errors.parameterRequaire("Name and token");
        }
        mongodb_1.MongoClient.connect(db_1.default, function (err, db) {
            try {
                if (err)
                    throw err;
                var feedback = req.body.feedback;
                var insightId = req.body.id;
                var banks = db.collection('banks').find({
                    bankName: req.headers.name,
                    token: req.headers.token
                }).toArray(function (err, mongoRes) {
                    if (err)
                        throw err;
                    if (!mongoRes.length)
                        throw errors.autonticationError();
                });
                var insights = db.collection('insights');
                try {
                    insights.updateOne({ id: insightId }, { $push: { feedback: feedback } }, function (err, result) {
                        if (err)
                            throw err;
                        db.close();
                        res.send({ ok: "ok" });
                    });
                }
                catch (err) {
                    res.status(err.errorCode || 401).send(err);
                }
            }
            catch (err) {
                res.status(err.errorCode || 401).send(err);
            }
        });
    }
    catch (err) {
        res.status(err.errorCode || 500).send(err);
    }
};
