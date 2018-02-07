import {MongoClient} from 'mongodb';
import * as errors from "../models/errors"
import url from "../db/db";
import generator from "./generateInsights"
import {blockForDialog , dialogsForStory , storyIdForInsightId , classForDialog} from "../models/insightsConfiguration"
import TextForDialog from '../models/InsightDetailsMessages'
import TextForStory from '../models/InsightsMessages'
import {generateFacts} from './generateFacts'

export const getInsightDetails = (req , res) => {
    try {
        if (!req.headers.token || !req.headers.name) {
            throw errors.parameterRequaire("Name and token");
        }
        MongoClient.connect(url , function (err , db) {
            try {
                if (err) throw err;
                db.collection('banks').find({
                    bankName: req.headers.name ,
                    token: req.headers.token
                }).toArray(function (err , mongoRes) {
                    try {
                        db.close();
                        if (!mongoRes.length)
                            throw errors.autonticationError();
                        if (!mongoRes[0].insights.includes(req.body.insightId))
                            throw errors.InsightnotVaild(req.body.insightId);
                        const transactions = req.body.transactions;
                        const accounts = req.body.accounts;
                        const language = req.headers.lang || "en";
                        const insightId = req.body.insightId;
                        const storyId = storyIdForInsightId[insightId];
                        const text = {storyId};
                        text["title"] = {};
                        text["title"][language] = {txt: TextForStory[language][insightId].title}
                        const story = {
                            story: {
                                storyId ,
                                dialogs:
                                    dialogsForStory[storyId].map((dialog , i) => {
                                        text[dialog] = TextForDialog[dialog];
                                        return {
                                            id: dialog ,
                                            ...classForDialog.indexOf(dialog) > -1 ? {class: "perso-white"} : {} ,
                                            blocks: blockForDialog[dialog].map((block , index) => ({index , ...block})) ,
                                            ...i + 1 < dialogsForStory[storyId].length ?
                                                {next: {target: dialogsForStory[storyId][i + 1]}} : {}
                                        };
                                    }) ,
                                id: storyId + "_Definition"
                            } ,
                            facts: {
                                storyId ,
                                ...generateFacts(insightId , transactions , accounts)
                            } ,
                            text
                        };
                        res.send(story);
                    } catch (err) {
                        res.status(err.errorCode || 401).send(err);
                    }
                });
            } catch (err) {
                res.status(err.errorCode || 401).send(err);
            }
        });
    }
    catch (err) {
        res.status(err.errorCode || 500).send(err);
    }
}

export const getInsights = (req , res) => {
    try {
        if (!req.headers.token || !req.headers.name) {
            throw errors.parameterRequaire("Name and token");
        }
        const language = req.headers.lang || "en";
        MongoClient.connect(url , function (err , db) {
            try {
                if (err) throw err;
                db.collection('banks').find({
                    bankName: req.headers.name ,
                    token: req.headers.token
                }).toArray(function (err , mongoRes) {
                    try {
                        db.close();
                        if (!mongoRes.length)
                            throw errors.autonticationError();
                        const UserInsights = [];
                        const BankInsights = mongoRes[0].insights;
                        const transactions = req.body.transactions;
                        BankInsights.forEach((BankInsight) => {
                            const insight = generator(BankInsight , transactions, language);
                            if (insight != null)
                                UserInsights.push(insight);
                        });
                        res.send(UserInsights);
                    }
                    catch (err) {
                        res.status(err.errorCode || 401).send(err);
                    }
                });
            } catch (err) {
                res.status(err.errorCode || 401).send(err);
            }
        });
    }
    catch (err) {
        res.status(err.errorCode || 500).send(err);
    }
}
