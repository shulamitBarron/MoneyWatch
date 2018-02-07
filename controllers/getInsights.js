"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var errors = require("../models/errors");
var db_1 = require("../db/db");
var generateInsights_1 = require("./generateInsights");
var insightsConfiguration_1 = require("../models/insightsConfiguration");
var InsightDetailsMessages_1 = require("../models/InsightDetailsMessages");
var InsightsMessages_1 = require("../models/InsightsMessages");
var generateFacts_1 = require("./generateFacts");
exports.getInsightDetails = function (req, res) {
    try {
        if (!req.headers.token || !req.headers.name) {
            throw errors.parameterRequaire("Name and token");
        }
        mongodb_1.MongoClient.connect(db_1.default, function (err, db) {
            try {
                if (err)
                    throw err;
                db.collection('banks').find({
                    bankName: req.headers.name,
                    token: req.headers.token
                }).toArray(function (err, mongoRes) {
                    try {
                        db.close();
                        if (!mongoRes.length)
                            throw errors.autonticationError();
                        if (!mongoRes[0].insights.includes(req.body.insightId))
                            throw errors.InsightnotVaild(req.body.insightId);
                        var transactions = req.body.transactions;
                        var accounts = req.body.accounts;
                        var language = req.headers.lang || "en";
                        var insightId = req.body.insightId;
                        var storyId_1 = insightsConfiguration_1.storyIdForInsightId[insightId];
                        var text_1 = { storyId: storyId_1 };
                        text_1["title"] = {};
                        text_1["title"][language] = { txt: InsightsMessages_1.default[language][insightId].title };
                        var story = {
                            story: {
                                storyId: storyId_1,
                                dialogs: insightsConfiguration_1.dialogsForStory[storyId_1].map(function (dialog, i) {
                                    text_1[dialog] = InsightDetailsMessages_1.default[dialog];
                                    return __assign({ id: dialog }, insightsConfiguration_1.classForDialog.indexOf(dialog) > -1 ? { class: "perso-white" } : {}, { blocks: insightsConfiguration_1.blockForDialog[dialog].map(function (block, index) { return (__assign({ index: index }, block)); }) }, i + 1 < insightsConfiguration_1.dialogsForStory[storyId_1].length ?
                                        { next: { target: insightsConfiguration_1.dialogsForStory[storyId_1][i + 1] } } : {});
                                }),
                                id: storyId_1 + "_Definition"
                            },
                            facts: __assign({ storyId: storyId_1 }, generateFacts_1.generateFacts(insightId, transactions, accounts)),
                            text: text_1
                        };
                        res.send(story);
                    }
                    catch (err) {
                        res.status(err.errorCode || 401).send(err);
                    }
                });
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
exports.getInsights = function (req, res) {
    try {
        if (!req.headers.token || !req.headers.name) {
            throw errors.parameterRequaire("Name and token");
        }
        var language_1 = req.headers.lang || "en";
        mongodb_1.MongoClient.connect(db_1.default, function (err, db) {
            try {
                if (err)
                    throw err;
                db.collection('banks').find({
                    bankName: req.headers.name,
                    token: req.headers.token
                }).toArray(function (err, mongoRes) {
                    try {
                        db.close();
                        if (!mongoRes.length)
                            throw errors.autonticationError();
                        var UserInsights_1 = [];
                        var BankInsights = mongoRes[0].insights;
                        var transactions_1 = req.body.transactions;
                        BankInsights.forEach(function (BankInsight) {
                            var insight = generateInsights_1.default(BankInsight, transactions_1, language_1);
                            if (insight != null)
                                UserInsights_1.push(insight);
                        });
                        res.send(UserInsights_1);
                    }
                    catch (err) {
                        res.status(err.errorCode || 401).send(err);
                    }
                });
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
